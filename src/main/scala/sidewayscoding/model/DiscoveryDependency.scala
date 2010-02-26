package sidewayscoding.model

import net.liftweb._
import net.liftweb.common._
import mapper._
import http._
import SHtml._ 
import util._

class DiscoveryDependency extends LongKeyedMapper[DiscoveryDependency] with IdPK {

	def getSingleton = DiscoveryDependency

	object dependent extends MappedLongForeignKey(this, Discovery)  
	object dependency extends MappedLongForeignKey(this, Discovery)  
	object comment extends MappedText(this)

}
object DiscoveryDependency extends DiscoveryDependency with LongKeyedMetaMapper[DiscoveryDependency] {
	def join (dependent :Discovery, dependency :Discovery) =
		this.create.dependent(dependent).dependency(dependency).save	
		
	def deleteConnections(discovery: Discovery) = {
		(DiscoveryDependency.findAll(By(DiscoveryDependency.dependent,discovery)) :::
		DiscoveryDependency.findAll(By(DiscoveryDependency.dependency,discovery))).foreach{ _.delete_!}
	}
}
