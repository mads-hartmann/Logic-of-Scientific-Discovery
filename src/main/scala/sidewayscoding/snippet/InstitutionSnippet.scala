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
import _root_.net.liftweb.widgets.tablesorter._

import sidewayscoding.model._

class InstitutionSnippet {
	
	object institution extends RequestVar[Institution]( defaultInstitution() )
	
	def defaultInstitution() = {
		S.param("id") match { 
			case Full(institutionId) => {
				val id :Int = Integer.parseInt(institutionId)
				Institution.find(id) match {
					case Full(institution) => institution
					case _ => redirectTo("/institution")
				}
			}
			case Empty => Institution.create
			case Failure(msg,_,_) => Institution.create
		}
	}
		
	def deleteInstitution() = {
		Institution.delete_!(institution.is)
		redirectTo("/institution")
	}
	
	def displayForm(xhtml: NodeSeq): NodeSeq = {
		
		val deleteBtn = 
			if(institution.is.saved_?) submit("Delete", deleteInstitution,("class","btn")) 
			else  submit("Delete", deleteInstitution,("class","btn"), ("disabled","disabled"))
		
		bind("form", xhtml, 
			 "name" 		-> text(institution.is.name.is,institution.is.name(_)),
			 "nationality" 	-> text(institution.is.nationality.is,institution.is.nationality(_)),
			 "submit" 		-> submit("Gem", () => {Institution.trySave(institution.is)},("class","btn")),
			 "delete" 		-> deleteBtn )
	}
	
	def displayInstitutions(xhtml: NodeSeq): NodeSeq = {
		
		bind("institutions", xhtml,
		 	 "tablesorter" -> TableSorter("table"),
			 "institutions" -> Institution.findAll.flatMap{ institution => 
				 bind("institution", chooseTemplate("institutions","institutions",xhtml), 
					  "name" -> Text(institution.name),
					  AttrBindParam("link",Text("/institution/" + institution.id),"href"),
					  "nationality" -> Text(institution.nationality))
			})
		
	}
	
}