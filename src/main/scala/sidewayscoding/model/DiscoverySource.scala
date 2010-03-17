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
	object source extends MappedLongForeignKey(this, Scientist) 

}
object DiscoverySource extends DiscoverySource with LongKeyedMetaMapper[DiscoverySource] {
	
	def join (source :Scientist, discovery :Discovery): Boolean = {
		
		def validate(sBday: Int, sDday: Int, dYear: Int) = if (sBday < dYear && sDday > dYear) true else false
			
		if (validate(source.birth,source.death,discovery.year)) {
			this.create.source(source.id).discovery(discovery).save
			S.notice("Just saved a discovery")
			true
		} else {
			S.error("Sorry, the scientsit(s) couldnt have made that discovery.")
			println("wasn't valid") //@DEBUG
			false
		}
	}
}	


