package sidewayscoding.model

import net.liftweb._
import mapper._
import http._
import SHtml._ 
import util._
import net.liftweb.common._
import xml.{Text, NodeSeq}
import lib.{SafeSave}

class Award extends LongKeyedMapper[Award] with IdPK {
  
	def getSingleton = Award

	object name extends MappedPoliteString(this, 128) {
		override def validations = valMinLen(1, "The name cannot be empty") _ :: Nil
	}
	object year extends MappedInt(this) {
		
		def validateYear (y: Int) = {
			if ( year > 2009 || year < 0 ) List(FieldError(this, Text("Year has to be between 0 and 2009")))
			else List[FieldError]()
		}
		
		override def validations = validateYear _ :: Nil
	}
	def sources = AwardSource.findAll(By(AwardSource.award,this)).map(_.award.obj.open_!)
  
}
object Award extends Award with LongKeyedMetaMapper[Award] with SafeSave[Award] {
	
	private def deleteWithValidDBState(in: Award) = 
		AwardSource.findAll(By(AwardSource.award,Award)).foreach{ _.delete_!}
		
	override def beforeDelete = deleteWithValidDBState _ :: Nil

}
