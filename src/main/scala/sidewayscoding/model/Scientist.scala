
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
import java.util.Date

import net.liftweb._
import mapper._
import http._
import SHtml._ 
import util._
import common._

class Scientist extends LongKeyedMapper[Scientist] with IdPK {
  
	def getSingleton = Scientist

	object nationality extends MappedPoliteString(this, 128) {
		override def validations = valMinLen(1, "name has to contain atleast 1 char") _ :: Nil
	}
	
	object imageName extends MappedString(this,256)
	
	object name extends MappedPoliteString(this, 256) {
		override def validations = valMinLen(1, "name has to contain atleast 1 char") _ :: Nil
	}
	
	object birth extends MappedInt(this) {
		def validateBirth(b: Int) = {
			val date = new Date
			if ( b > date.getYear+1900) List(FieldError(this, Text("Invalid year of birth")))
			else List[FieldError]()
		}
		override def validations = validateBirth _ :: Nil
	}

	object death extends MappedInt(this) {
		def validateDeath (y: Int) = {
			val date = new Date
			if ( y > date.getYear+1900 || y < birth.is ) List(FieldError(this, Text("Invalid year of death")))
			else List[FieldError]()
		}
		override def validations = validateDeath _ :: Nil
	}
	
	def awards =  AwardSource.findAll(By(AwardSource.source,this.id)).map(_.award.obj.open_!)
	def discoveries = DiscoverySource.findAll(By(DiscoverySource.source,this.id)).map(_.discovery.obj.open_!)

} 
object Scientist extends Scientist with LongKeyedMetaMapper[Scientist] with SafeSave[Scientist] {
	override def dbTableName = "Source"	
		
	private def deleteWithValidDBState(in: Scientist) = {		
		DiscoverySource.findAll(By(DiscoverySource.source,in.id)).foreach{ _.delete_!}
		AwardSource.findAll(By(AwardSource.source,in.id)).foreach{ _.delete_!}
	}
	
	override def beforeDelete = deleteWithValidDBState _ :: Nil
}