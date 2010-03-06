package sidewayscoding.snippet

import xml.{Text, NodeSeq}
import net.liftweb.util.Helpers._
import net.liftweb.mapper._
import net.liftweb.http.S._
import net.liftweb.http.SHtml._
import net.liftweb.common._

import net.liftweb.http.{S, RequestVar, SessionVar}
import scala.util.regexp
import java.util.Date

import sidewayscoding.model._

import net.liftweb.http.provider.HTTPCookie

class Stats {

	def displayStats(xhtml: NodeSeq): NodeSeq = {
		
		val scientistCount = Scientist.count
		val labCount = Lab.count
		
		bind("stats", xhtml, 
			 "discoveries" -> Discovery.count,
			 "sources" -> (scientistCount+labCount).toString,
			 "scientists" -> scientistCount,
			 "labs" -> labCount)
	 }
	
}