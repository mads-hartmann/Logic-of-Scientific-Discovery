
package sidewayscoding.model

import net.liftweb._
import mapper._
import http._
import SHtml._ 
import util._
import sidewayscoding.lib.{SafeSave}

class Field extends LongKeyedMapper[Field] with IdPK {
  
	def getSingleton = Field

	object name extends MappedPoliteString(this, 128) {
		override def validations = valMinLen(1, "Come on, one char can't be enough") _ :: Nil
	}

}
object Field extends Field with LongKeyedMetaMapper[Field] with SafeSave[Field] {
	
	override def beforeSave = checkValidation _ :: Nil
	
	def checkValidation(in: Field) = Field.validate(in).foreach{ msg => S.error(msg.toString)}
}
