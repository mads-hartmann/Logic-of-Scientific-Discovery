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

	
	object discoveryDependency extends RequestVar[DiscoveryDependency]( defaultDiscoveryDependency() )
	
	def defaultDiscoveryDependency(): DiscoveryDependency = {
		S.param("id") match { 
			case Full(idStr) => {
				val id :Int = Integer.parseInt(idStr)
				DiscoveryDependency.find(id) match {
					case Full(discoverydependency) => discoverydependency
					case Empty => redirectTo("/dependency")
					case Failure(msg,_,_) => redirectTo("/dependency")
				}
			}
			case Empty => DiscoveryDependency.create
			case Failure(msg, _, _) => DiscoveryDependency.create
		}
	}


	// this methods persists the user in the database
	// TODO add validation (to the Discobery object) and account for it here
	def processSubmit() = {
		
		if (DiscoveryDependency.trySave(discoveryDependency)) {
			S.notice("Yay, you just added a dependency")
		} else {
			S.error("Didn't save it, dunno why")
		}
	} 		
	
	def deleteDiscoveryDependency() = {
		DiscoveryDependency.delete_!(discoveryDependency)
		S.notice("Bummer, you just deleted a dependency")
		redirectTo("/dependency")
	}
	
	/*
		This methods displays a form for creating a Discovery object and storing it 
		TODO at some point, this sould be able to edit em also. 
	*/
	def displayForm(xhtml: NodeSeq): NodeSeq = {
		
		val deleteBtn = 
			if(discoveryDependency.is.saved_?) submit("Delete", deleteDiscoveryDependency,("class","btn")) 
			else submit("Delete", deleteDiscoveryDependency,("class","btn"), ("disabled","disabled"))
		val options = Discovery.findAll.map{ discovery => (discovery,discovery.description.is)}
		bind("form", xhtml, 
			 "dependent" 	-> {
				selectObj[Discovery](options,Full(discoveryDependency.dependent.obj match {
					case Full(dependent) => dependent
					case _ => options.first._1
				}),discoveryDependency.is.dependent(_))
			},
			 "dependency" -> {
				selectObj[Discovery](options,Full(discoveryDependency.dependency.obj match {
					case Full(dependency) => dependency
					case _ => options.first._1
				}),discoveryDependency.is.dependency(_))
			},
			"comment" -> textarea(discoveryDependency.is.comment.is,discoveryDependency.is.comment(_)),
			 "submit" 		-> submit("Gem", processSubmit,("class","btn")),
			 "delete" 		-> deleteBtn
			)

	 }	
	
	def displayDependencies(xhtml: NodeSeq): NodeSeq = {

		bind("dependencies", xhtml,
		 	 "tablesorter" -> TableSorter("table"),
			 "dependencies" -> DiscoveryDependency.findAll.flatMap{ discoveryDependency => 
					bind("dependency", chooseTemplate("dependencies","dependencies",xhtml), 
						   "dependent" -> Text(discoveryDependency.dependent.obj match {
									case Full(d) => d.description.is
									case _ => ""
								}),
						   "dependency" -> Text(discoveryDependency.dependency.obj match {
									case Full(d) => d.description.is
									case _ => ""
								}),
						   "comment" -> { discoveryDependency.comment.is match {
									case null => ""
									case comment => comment
								}},
						   AttrBindParam("editLink",Text("/dependency/" + discoveryDependency.id),"href")
						 )
			})
	}
	
}