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


class DependencySnippet {

	
	object discovery extends RequestVar[Discovery]( defaultDiscovery() )
	object dependencies extends RequestVar[List[Discovery]](List[Discovery]())
	object comment extends RequestVar("")
	
	def defaultDiscovery(): Discovery = {
		S.param("id") match { 
			case Full(idStr) => {
				val id :Int = Integer.parseInt(idStr)
				Discovery.find(id) match {
					case Full(discovery) => discovery
					case Empty => redirectTo("/discovery")
					case Failure(msg,_,_) => redirectTo("/discovery")
				}
			}
			case Empty => Discovery.create
			case Failure(msg, _, _) => Discovery.create
		}
	}


	// this methods persists the user in the database
	// TODO add validation (to the Discobery object) and account for it here
	def processSubmit() = {
		
		if (Discovery.trySave(discovery)) {

			DiscoveryDependency.deleteConnections(discovery)

			// connection
			dependencies.is.foreach{ dependency: Discovery => DiscoveryDependency.join(discovery,dependency) match {
				case Full(dd) => dd.comment(comment.is).save
				case _ => {
					S.error("Something went wrong")
					redirectTo("/")
				}
			}}

		}
		
	} 		
	
	
	def deleteDiscovery() = {
		Discovery.delete_!(discovery)
		redirectTo("/discovery")
	}
	
	/*
		This methods displays a form for creating a Discovery object and storing it 
		TODO at some point, this sould be able to edit em also. 
	*/
	def displayForm(xhtml: NodeSeq): NodeSeq = {
		
		def processDependencies(in: List[String]) = 
			dependencies(in.map{ description => Discovery.find(By(Discovery.description,description)).open_!})

		val deleteBtn = 
			if(discovery.is.saved_?) submit("Delete", deleteDiscovery,("class","btn")) 
			else submit("Delete", deleteDiscovery,("class","btn"), ("disabled","disabled"))
		bind("form", xhtml, 
			 "dependent" 	-> {
				val options = Discovery.findAll.map{ discovery => (discovery,discovery.description.is)}
				selectObj[Discovery](options,Full(options.first._1),discovery(_))
			},
			 "dependency" -> {
				val options = Discovery.findAll.map{ discovery => (discovery.description.is,discovery.description.is)}
				multiSelect(options,dependencies.is.map{ _.description },processDependencies(_))
			},
			"comment" -> textarea(comment,comment(_)),
			 "submit" 		-> submit("Gem", processSubmit,("class","btn")),
			 "delete" 		-> deleteBtn
			)

	 }	
}