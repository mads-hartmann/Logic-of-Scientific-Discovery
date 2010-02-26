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

class FieldSnippet {
	
	object field extends RequestVar( defaultField() )
	
	def defaultField() = {
		S.param("id") match { 
			case Full(fieldId) => {
				val id :Int = Integer.parseInt(fieldId)
				Field.find(id) match {
					case Full(f) => f
					case _ => redirectTo("/field")
				}
			}
			case _ => Field.create
		}
	}

	//	Deletes the field from the database (if it exists)
	def deleteField() = {
		field.delete_!
		redirectTo("/field")
	}
	
	def displayForm(xhtml: NodeSeq): NodeSeq = {
		
		val deleteBtn = 
			if(Field.saved_?(field.is)) submit("Delete", deleteField,("class","btn")) 
			else submit("Delete", deleteField,("class","btn"), ("disabled","disabled"))
		
		bind("form", xhtml, 
			 "name" -> text(field.is.name,field.is.name(_)),
			 "submit" -> submit("Save", () => { Field.trySave(field.is) },("class","btn")),
			 "delete" -> deleteBtn )
	}
	
	
	// Displays a row for each field in the database
	def displayFields(xhtml: NodeSeq): NodeSeq = {
		
		bind("fields", xhtml,
		 	 "tablesorter" -> TableSorter("table"),
			 "fields" -> Field.findAll.flatMap{
				 field => 
				 bind("field", chooseTemplate("fields","fields",xhtml),
				 	  AttrBindParam("link",Text("/field/" + field.id),"href"),
					  "name" -> Text(field.name))
			})	
	}
	
	
}