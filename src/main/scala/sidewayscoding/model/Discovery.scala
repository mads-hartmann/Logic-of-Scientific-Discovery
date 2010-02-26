//
//	Discovery
//	Created by mahj on 2010-01-22.
//
package sidewayscoding.model

import net.liftweb._
import mapper._
import http._
import SHtml._ 
import util._
import net.liftweb.common._
import lib.{SafeSave}
import xml.{Text}

class Discovery extends LongKeyedMapper[Discovery] with IdPK {
	
	def getSingleton = Discovery
	
	// primatives 
	object description extends MappedTextarea(this, 600){
		override def validations = valMinLen(1, "A description has to contain more than one char") _ :: Nil
	}
	object year extends MappedInt(this){
		
		def validateYear (y: Int) = {
			if ( year > 2009 || year < 0 ) List(FieldError(this, Text("Year has to be between 0 and 2009")))
			else List[FieldError]()
		}
		
		override def validations = validateYear _ :: Nil
	}
	object reference extends MappedPoliteString(this, 128)
	object field extends MappedLongForeignKey(this, Field)
	object isExperiment extends MappedBoolean(this)
	// relationships
	def sources = 
		DiscoverySource.findAll(By(DiscoverySource.discovery,this.id)).map(_.source.obj.open_!)
	def dependencies = 
		DiscoveryDependency.findAll(By(DiscoveryDependency.dependent,this.id)).map(_.dependency.obj.open_!)
  
}
object Discovery extends Discovery with LongKeyedMetaMapper[Discovery] with SafeSave[Discovery] {
	
	private def deleteWithValidDBState(in: Discovery) = {
		DiscoverySource.findAll(By(DiscoverySource.discovery,in)).foreach{_.delete_!}
		DiscoveryDependency.deleteConnections(in)
	}
	
	override def beforeDelete = deleteWithValidDBState _ :: Nil	
}