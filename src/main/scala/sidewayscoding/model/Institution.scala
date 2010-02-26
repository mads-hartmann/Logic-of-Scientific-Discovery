package sidewayscoding.model

import net.liftweb._
import mapper._
import common._
import http._
import SHtml._ 
import util._
import xml.{Text, NodeSeq}
import lib.{SafeSave}

class Institution extends LongKeyedMapper[Institution] with IdPK {
  
  	def getSingleton = Institution
  
  	object name extends MappedPoliteString(this, 128){
		override def validations = valMinLen(1, "name has to contain atleast 1 char") _ :: Nil
	}
  	
	object nationality extends MappedPoliteString(this, 128) {
		override def validations = valMinLen(1, "nationality has to contain atleast 1 char") _ :: Nil
	} 
}

object Institution extends Institution with LongKeyedMetaMapper[Institution] with SafeSave[Institution]{
	
	private def deleteWithValidDBState(in: Institution) = {	
		Lab.findAll(By(Lab.institution,in)).foreach { lab: Lab => 
			Lab.delete_!(lab)
		}
	}
	
	override def beforeDelete = deleteWithValidDBState _ :: Nil	
	
}
