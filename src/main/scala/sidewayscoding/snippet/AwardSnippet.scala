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
import _root_.net.liftweb.widgets.tablesorter._

class AwardSnippet {
	
	
	object award extends RequestVar( defaultAward() )
	
	def defaultAward() = {
		S.param("id") match { 
			case Full(awardId) => {
				val id :Int = Integer.parseInt(awardId)
				Award.find(id) match {
					case Full(a) => a
					case _ => redirectTo("/award")
				}
			}
			case _ => Award.create
		}
	}


	// Displays a form for editing an award 
	def displayForm(xhtml: NodeSeq): NodeSeq = {
			
		val deleteBtn = 
			if(Award.saved_?(award)) submit("Delete", () => { Award.delete_!(award.is)},("class","btn")) 
			else submit("Delete",() => { Award.delete_!(award.is)},("class","btn"), ("disabled","disabled"))
		
		bind("form", xhtml, 
			 "name" -> text(award.is.name,award.is.name(_)),
			 "year" -> text(award.is.year.toString,(year: String) => award.is.year(Integer.parseInt(year))),
			 "submit" -> submit("Save", () => { Award.trySave(award.is) },("class","btn")),
			 "delete" -> deleteBtn )
	}
	
	
	/* --------------------------------------------------------------------------------
		Displays a row for each award in the database
	-------------------------------------------------------------------------------- */
	def displayAwards(xhtml: NodeSeq): NodeSeq = {
		
		bind("awards", xhtml,
		 	 "tablesorter" -> TableSorter("table"),
			 "awards" -> Award.findAll.flatMap{
				 award => 
				 bind("award", chooseTemplate("awards","awards",xhtml),
					  "year" -> Text(award.year.toString),
				 	  AttrBindParam("link",Text("/award/" + award.id),"href"),
					  "name" -> Text(award.name))
			})	
	}
	
	
}