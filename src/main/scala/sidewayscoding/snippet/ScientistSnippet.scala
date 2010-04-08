package sidewayscoding.snippet

import xml.{Text, NodeSeq}
import net.liftweb.util.Helpers._
import net.liftweb.mapper._
import net.liftweb.http.{FileParamHolder}
import net.liftweb.http.S._
import net.liftweb.http.SHtml._
import net.liftweb.common._

import sidewayscoding.model._
import net.liftweb.http.{S, RequestVar, SessionVar}
import scala.util.regexp
import java.util.Date

import net.liftweb.http.provider.HTTPCookie
import _root_.net.liftweb.widgets.tablesorter._

class ScientistSnippet {

	def displayScientistForm(xhtml: NodeSeq): NodeSeq = {
		
		object scientist extends RequestVar[Scientist]( defaultScientist() )
		object selectedAwards extends RequestVar[List[Award]](List[Award]())
		
		def defaultScientist(): Scientist = {
			S.param("id") match { 
				case Full(sourceId) => {
					val id :Int = Integer.parseInt(sourceId)
					Scientist.find(id) match {
						case Full(scientist) => scientist
						case _ => redirectTo("/source")
					}
				}
				case _ => Scientist.create
			}
		}
			
		def processSubmit() = {
			if (Scientist.trySave(scientist.is)) {
				AwardSource.findAll(By(AwardSource.source,scientist.is)).foreach{ _.delete_! }
				selectedAwards.is.foreach{ award => AwardSource.join(scientist.is,award)}
			}
		}
		
		def processAwards(in: List[String]) = selectedAwards(in.map{ name => Award.findAll(By(Award.name,name)).first})
		
		val awards = Award.findAll
		val awardOptions :Seq[(String,String)] = awards.map{ award => (award.name.is,award.name.is+"("+award.year.toString+")")}
		
		val deleteBtn = 
			if(Scientist.saved_?(scientist.is)) submit("Delete", () => Scientist.delete_!(scientist),("class","btn")) 
			else submit("Delete", () => Scientist.delete_!(scientist),("class","btn"), ("disabled","disabled"))
		
		def saveFile(fp: FileParamHolder): Unit = {
	    fp.file match {
	      case null => S.error("No file selected")
	      case x if x.length == 0 => S.error("Empty file uploaded")
	      case x =>
	        val blob = ImageBlob.create.image(x)
					val img = ImageInfo.create.imgName(fp.fileName).mimeType(fp.mimeType)
					scientist.imageName(fp.fileName)
					img.validate match {
					  case Nil =>
					    blob.saveMe
					    img.imgBlob(blob)
					    img.saveMe
					    S.notice("Thanks for the upload")
					  case err =>
					    S.error(err)
					}
	    }
	  }
		
		bind( 	"form", xhtml, 
						"name" 			-> text(scientist.is.name,scientist.is.name(_)),
						"birth" 		-> text(scientist.is.birth.is.toString, (in: String) => scientist.is.birth(Integer.parseInt(in))),
						"death" 		-> text(scientist.is.death.is.toString, (in: String) => scientist.is.death(Integer.parseInt(in))),
						"nationality" 	-> text(scientist.is.nationality, scientist.is.nationality(_)),
						"delete" 		-> deleteBtn,
						"imageUpload"	-> fileUpload(saveFile _),
						"submit" 		-> submit("Save", processSubmit,("class","btn") ),
						"awards" 		-> multiSelect(awardOptions, selectedAwards.map{ _.toString }, processAwards(_)))
			}
	
	def displaySources(xhtml: NodeSeq): NodeSeq = {
			
		bind("sources", xhtml,
		 	 "tablesorter" -> TableSorter("table"),
			 "sources" -> Scientist.findAll.flatMap{ scientist => 
					bind("source", chooseTemplate("sources","sources",xhtml), 
						  "name" -> Text(scientist.name),
							AttrBindParam("img",Text("/images/%s".format(scientist.imageName.toString)),"src"),
						  AttrBindParam("link",Text("/person/" + scientist.id),"href"),
						  "birth" -> Text(scientist.birth.toString),
						  "death" -> Text(scientist.death.toString),
						  "nationality" -> Text(scientist.nationality),
		  				  "institution" -> Text("-"),
		  				  "discoveries" -> Text(scientist.discoveries.size.toString),
						  "awards" -> Text(scientist.awards.size.toString)
						 )
			})
	}

}