package sidewayscoding.lib 	

import net.liftweb._
import mapper._
import http._
import SHtml._ 
import util._
import net.liftweb.common._
import xml.{Text, NodeSeq}

trait SafeSave[T <: LongKeyedMapper[T]] { this: LongKeyedMetaMapper[T] => 
	
	def trySave(in: T): Boolean = {
		if (in.validate.size > 0) {// wasn't valid
			in.validate.foreach{ msg => S.error(msg.toString)}
			false
		} else {
			in.save
			true
		}
	}
	
}

