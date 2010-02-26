package sidewayscoding.model

import net.liftweb._
import net.liftweb.common._
import mapper._
import http._
import SHtml._ 
import util._

class AwardSource extends LongKeyedMapper[AwardSource] with IdPK {

	def getSingleton = AwardSource

	object award extends MappedLongForeignKey(this, Award)  
	object isLab extends MappedBoolean(this) 
		
	object source extends MappedLong(this) { 
		def obj = if(isLab) Lab.find(is) else Scientist.find(is) 
		def obj(s: BaseSource) = s match { 
			case l: Lab => set(l.id) 
			case s: Scientist => set(s.id) 
		}
	}

}
object AwardSource extends AwardSource with LongKeyedMetaMapper[AwardSource] {
	
	def join (source :BaseSource, award :Award) {
		source match {
			case l: Lab => this.create.source(l.id).award(award).isLab(true).save
			case s: Scientist => this.create.source(s.id).award(award).isLab(false).save
			case b: BaseSource => println("<--- found base_source")
		}
	}
	
}
