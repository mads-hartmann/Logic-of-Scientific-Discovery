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
	object source extends MappedLongForeignKey(this, Scientist)

}
object AwardSource extends AwardSource with LongKeyedMetaMapper[AwardSource] {
	
	def join (source :Scientist, award :Award) = 
		this.create.source(source.id).award(award).save		
		
}

