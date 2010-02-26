package sidewayscoding.model

import net.liftweb._
import net.liftweb.common._
import mapper._
import http._
import SHtml._ 
import util._

class DiscoverySource extends LongKeyedMapper[DiscoverySource] with IdPK {

	def getSingleton = DiscoverySource

	object discovery extends MappedLongForeignKey(this, Discovery)  
	object isLab extends MappedBoolean(this) 
		
	object source extends MappedLong(this) { 
		def obj = if(isLab) Lab.find(is) else Scientist.find(is) 
		def obj(s: BaseSource) = s match { 
			case l: Lab => set(l.id) 
			case s: Scientist => set(s.id) 
		}
	}

}
object DiscoverySource extends DiscoverySource with LongKeyedMetaMapper[DiscoverySource] {
	
	def join (source :BaseSource, discovery :Discovery) {
		source match {
			case l: Lab => this.create.source(l.id).discovery(discovery).isLab(true).save
			case s: Scientist => this.create.source(s.id).discovery(discovery).isLab(false).save
			case b: BaseSource => println("<--- found base_source")
		}
	}	
}

