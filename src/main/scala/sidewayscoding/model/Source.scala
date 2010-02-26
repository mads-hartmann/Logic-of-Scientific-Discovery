
package sidewayscoding.model

import net.liftweb._
import mapper._
import http._
import SHtml._ 
import util._
import net.liftweb.common._
import java.util.Date
import lib.{SafeSave}
import xml.{Text}

object SourceTypes extends Enumeration { 
	val Scientist = Value("Scientist") 
	val Lab = Value("Lab") 
}

trait BaseSourceTrait[ T <:BaseSourceTrait[T] ] extends LongKeyedMapper[T] { 
	
	self: T => 

	override def primaryKeyField = id
	object id extends MappedLongIndex(this)

	object birth extends MappedInt(this) {
		def validateBirth(b: Int) = {
			if ( b > 2009) List(FieldError(this, Text("Invalid year of birth")))
			else List[FieldError]()
		}
		override def validations = validateBirth _ :: Nil
	}
	
	object death extends MappedInt(this) {
		def validateDeath (y: Int) = {
			if ( y > 2009 || y < birth.is ) List(FieldError(this, Text("Invalid year of death")))
			else List[FieldError]()
		}
		override def validations = validateDeath _ :: Nil
	}

	object name extends MappedPoliteString(this, 256) {
		override def validations = valMinLen(1, "name has to contain atleast 1 char") _ :: Nil
	}
	object sourceType extends MappedEnum(this,SourceTypes) { // making sure they have reasonable default values 
		override def defaultValue = {
			self match {
				case self: Scientist with BaseSourceTrait[T] => SourceTypes.Scientist
				case self: Lab with BaseSourceTrait[T] => SourceTypes.Lab
			}
		}
	} 
			
	def discoveries = DiscoverySource.findAll(By(DiscoverySource.source,this.id)).map(_.discovery.obj.open_!)
	
}
trait MetaBaseSourceTrait[T <: BaseSourceTrait[T]] extends LongKeyedMetaMapper[T] with SafeSave[T] {
	self: T =>

	override def count = {
		val stype: Int = this.sourceType.defaultValue match {
			case SourceTypes.Scientist => 0
			case SourceTypes.Lab => 1
		}
		self.countByInsecureSql("select count(*) from Source where sourceType = %d".format(stype), IHaveValidatedThisSQL("Mads H", "06-02-10"))
	}		
}

class BaseSource {}

class Scientist extends BaseSource with BaseSourceTrait[Scientist] {
  
	def getSingleton = Scientist

	object nationality extends MappedPoliteString(this, 128) {
		override def validations = valMinLen(1, "name has to contain atleast 1 char") _ :: Nil
	}
	
	def awards =  AwardSource.findAll(By(AwardSource.source,this.id)).map(_.award.obj.open_!)

} 
object Scientist extends Scientist with MetaBaseSourceTrait[Scientist] {
	override def dbTableName = "Source"	
	
	def findAllCustom = 
		this.findAll(By(Scientist.sourceType, SourceTypes.Scientist))
	
	private def deleteWithValidDBState(in: Scientist) = {		
		DiscoverySource.findAll(By(DiscoverySource.source,in.id)).foreach{ _.delete_!}
		AwardSource.findAll(By(AwardSource.source,in.id)).foreach{ _.delete_!}
	}
	
	override def beforeDelete = deleteWithValidDBState _ :: Nil
}


class Lab extends BaseSource with BaseSourceTrait[Lab]{
  
	def getSingleton = Lab

	object institution extends MappedLongForeignKey(this, Institution)
		
}
object Lab extends Lab with MetaBaseSourceTrait[Lab] {
	override def dbTableName = "Source"
	
	def findAllCustom = 
		this.findAll(By(Lab.sourceType, SourceTypes.Lab))
		
	private def deleteWithValidDBState(in: Lab) = {		
		DiscoverySource.findAll(By(DiscoverySource.source,in.id)).foreach{ _.delete_!}
	}
	
	override def beforeDelete = deleteWithValidDBState _ :: Nil
	
}