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
	
	def join (source :BaseSource, discovery :Discovery): Boolean = {
		
		def validate(sBday: Int, sDday: Int, dYear: Int) =  
			if (sBday < dYear && sDday > dYear) true else false
		
		
		source match { // matching the type of source
			case l: Lab => {
				if (validate(l.birth,l.death,discovery.year)) {
					this.create.source(l.id).discovery(discovery).isLab(true)
					true
				} else {
					false
				}
			}
			case s: Scientist => {
				if (validate(s.birth,s.death,discovery.year)) {
					this.create.source(s.id).discovery(discovery).isLab(false).save
					true
				} else {
					false
				}
			}
			case b: BaseSource => false
		}
	}	
}

