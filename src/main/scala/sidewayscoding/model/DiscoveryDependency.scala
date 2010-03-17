package sidewayscoding.model

import net.liftweb._
import net.liftweb.common._
import mapper._
import http._
import SHtml._ 
import util._
import lib.{SafeSave}

class DiscoveryDependency extends LongKeyedMapper[DiscoveryDependency] with IdPK {

	def getSingleton = DiscoveryDependency

	object dependent extends MappedLongForeignKey(this, Discovery)  
	object dependency extends MappedLongForeignKey(this, Discovery)  
	object comment extends MappedText(this)

}
object DiscoveryDependency extends DiscoveryDependency with LongKeyedMetaMapper[DiscoveryDependency] with SafeSave[DiscoveryDependency] {
	def join (dependent :Discovery, dependency :Discovery): Box[DiscoveryDependency] = {
		
		if (dependent != dependency && dependent.year.is > dependency.year.is) {
			val dd = this.create.dependent(dependent).dependency(dependency)
			dd.save
			Full(dd)
		} else {
			Empty
		}
	}
		
		
		
	def deleteConnections(discovery: Discovery) = {
		(DiscoveryDependency.findAll(By(DiscoveryDependency.dependent,discovery)) :::
		DiscoveryDependency.findAll(By(DiscoveryDependency.dependency,discovery))).foreach{ _.delete_!}
	}
}
