package sidewayscoding.snippet

import xml.{Text, NodeSeq}
import net.liftweb.util.Helpers._
import net.liftweb.mapper._
import net.liftweb.http.S._
import net.liftweb.http.SHtml._
import net.liftweb.common._

import sidewayscoding.model._
import net.liftweb.http.{S, RequestVar, SessionVar}
import scala.util.regexp
import java.util.Date

import net.liftweb.http.provider.HTTPCookie
import _root_.net.liftweb.widgets.tablesorter._

class SourceSnippet {

  	/*	---------------------------------------------------------------------- 
		Displays a form for editing and creating scientist entities
		---------------------------------------------------------------------- */
	def displayScientistForm(xhtml: NodeSeq): NodeSeq = {
		
		object scientist extends RequestVar[Scientist]( defaultScientist() )
		object selectedAwards extends RequestVar[List[Award]](List[Award]())
		
		def defaultScientist(): Scientist = {
			S.param("id") match { 
				case Full(sourceId) => {
					val id :Int = Integer.parseInt(sourceId)
					Scientist.find(id) match {
						case Full(scientist) => if(scientist.sourceType == SourceTypes.Scientist) scientist else redirectTo("/source")
						case _ => redirectTo("/source")
					}
				}
				case _ => Scientist.create
			}
		}
		
		def processSubmit() = {
			if (Scientist.trySave(scientist.is)) {
				AwardSource.findAll(By(AwardSource.source,scientist.is.id)).foreach{ _.delete_! }
				selectedAwards.is.foreach{ award => AwardSource.join(scientist.is,award)}
			}
		}
		
		def processAwards(in: List[String]) = selectedAwards(in.map{ name => Award.findAll(By(Award.name,name)).first})
		
		val awards = Award.findAll
		val awardOptions :Seq[(String,String)] = awards.map{ award => (award.name.is,award.name.is+"("+award.year.toString+")")}
		
		val deleteBtn = 
			if(Scientist.saved_?(scientist.is)) submit("Delete", () => Scientist.delete_!(scientist),("class","btn")) 
			else submit("Delete", () => Scientist.delete_!(scientist),("class","btn"), ("disabled","disabled"))
		
		bind( 	"form", xhtml, 
				"name" 			-> text(scientist.is.name,scientist.is.name(_)),
				"birth" 		-> text(scientist.is.birth.is.toString, (in: String) => scientist.is.birth(Integer.parseInt(in))),
				"death" 		-> text(scientist.is.death.is.toString, (in: String) => scientist.is.death(Integer.parseInt(in))),
				"nationality" 	-> text(scientist.is.nationality, scientist.is.nationality(_)),
				"submit" 		-> submit("Save", processSubmit,("class","btn") ),
				"delete" 		-> deleteBtn,
				"awards" 		-> multiSelect(awardOptions, selectedAwards.map{ _.toString }, processAwards(_)) 
			)
	}
	
	/*	---------------------------------------------------------------------- 
		Displays a form for editing and creating lab entities
		---------------------------------------------------------------------- */
	def displayLabForm(xhtml: NodeSeq): NodeSeq = {
		object lab extends RequestVar[Lab]( defaultLab() )
				
		def defaultLab() = {
			S.param("id") match { 
				case Full(sourceId) => {
					val id :Int = Integer.parseInt(sourceId)
					Lab.find(id) match {
						case Full(lab) => if (lab.sourceType == SourceTypes.Lab) lab else redirectTo("/source")
						case _ => redirectTo("/source")
					}
				}
				case _ => Lab.create
			}
		}
		
		val deleteBtn = 
			if(Lab.saved_?(lab.is)) submit("Delete", () => Lab.delete_!(lab),("class","btn")) 
			else submit("Delete", () => Lab.delete_!(lab),("class","btn"), ("disabled","disabled"))
		
		val institutions = Institution.findAll
		val options :Seq[(Institution,String)] = institutions.map{ inst => (inst,inst.name.is) }
		
		bind( 	"form", xhtml, 
				"name" 			-> text(lab.is.name,lab.is.name(_)),
				"submit" 		-> submit("Save", () => { Lab.trySave(lab.is) },("class","btn") ),
				"delete" 		-> deleteBtn,
				"institution" 	-> selectObj[Institution](options, lab.is.institution.obj, lab.is.institution(_))) 
	}

	
	
	/*	---------------------------------------------------------------------- 
		This methods display all of the discoveries in a sortable table 
		using the tablesorter widget
		---------------------------------------------------------------------- */
	def displaySources(xhtml: NodeSeq): NodeSeq = {
		
		def bindScientist(scientist: Scientist) = {
			bind("source", chooseTemplate("sources","sources",xhtml), 
				  "name" -> Text(scientist.name),
				  AttrBindParam("link",Text("/person/" + scientist.id),"href"),
				  "birth" -> Text(scientist.birth.toString),
				  "death" -> Text(scientist.death.toString),
				  "nationality" -> Text(scientist.nationality),
				  "sourceType" -> Text(scientist.sourceType.toString),
  				  "institution" -> Text("-"),
  				  "discoveries" -> Text(scientist.discoveries.size.toString),
				  "awards" -> Text(scientist.awards.size.toString)
				 )
		}
		def bindLab(lab: Lab): NodeSeq= {
			println("testing!!!")
			bind("source", chooseTemplate("sources","sources",xhtml), 
				  "name" -> Text(lab.name),
				  AttrBindParam("link",Text("/lab/" + lab.id),"href"),
				  "birth" -> Text("-"),
				  "death" -> Text("-"),
				  "nationality" -> Text(/*lab.institution.obj.open_!.nationality*/"testing"),
				  "sourceType" -> Text(lab.sourceType.toString),
  				  "institution" -> Text(/*lab.institution.obj.open_!.name*/"testing"),
  				  "discoveries" -> Text(lab.discoveries.size.toString),
				  "awards" -> Text("")
				 )
		}
		
		bind("sources", xhtml,
		 	 "tablesorter" -> TableSorter("table"),
			 "sources" -> (Scientist.findAllCustom ::: Lab.findAllCustom).flatMap{ source => 
				source match {
					case s: Scientist => bindScientist(s)
					case l: Lab => bindLab(l)
				}
			})	
	}
}
