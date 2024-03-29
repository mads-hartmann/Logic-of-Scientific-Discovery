package sidewayscoding.snippet

import xml.{Text, NodeSeq}
import net.liftweb.util.Helpers._
import net.liftweb.mapper._
import net.liftweb.http.S._
import net.liftweb.http.{FileParamHolder}
import net.liftweb.http.SHtml._
import net.liftweb.common._

import net.liftweb.http.{S, RequestVar, SessionVar}
import scala.util.regexp
import java.util.Date

import sidewayscoding.model._
import _root_.net.liftweb.widgets.tablesorter._


class DiscoverySnippet {

	
	object discovery extends RequestVar[Discovery]( defaultDiscovery() )
	object source extends RequestVar[List[Scientist]](List[Scientist]())
	object discoveries extends RequestVar[List[Discovery]](List[Discovery]())
	object imageDescription extends RequestVar[String]( defaultImageDescription() )
	
	def defaultImageDescription(): String = discovery.image match { 
		case Full(image) => image.description.is
		case _ => ""
	}

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

	def saveFile(fp: FileParamHolder): Unit = {
    fp.file match {
      case null => S.error("No file selected")
      case x if x.length == 0 => S.error("Empty file uploaded")
      case x =>
        val blob = ImageBlob.create.image(x)
				val img = ImageInfo.create.imgName(fp.fileName).mimeType(fp.mimeType).description(imageDescription.is)
				discovery.imageName(fp.fileName)
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
	
	// this methods persists the user in the database
	// TODO add validation (to the Discobery object) and account for it here
	
	def processSubmit() = if (Discovery.trySave(discovery)) {
		
		// update the description of the image
		discovery.image match { 
			case Full(image) => image.description( imageDescription.is ).save
			case _ => 
		}
		//everything else
		discovery.deleteSources
		source.is.foreach(DiscoverySource.join(_, discovery.is))
		redirectTo("/discovery")
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
		
		def processSources(in: List[String]) =  source(in.map{ name => Scientist.findAll(By(Scientist.name,name)).head})
		
		if (Field.count > 0) { //@TODO Clean this up?
			val sources = Scientist.findAll
			val sourceOptions = sources.map{ inst => (inst.name.is,inst.name.is) }

			val fields = Field.findAll
			val fieldOptions :Seq[(Field,String)] = fields.map{ 
				inst => (inst,inst.name.is) }

			val deleteBtn = 
				if(discovery.is.saved_?) submit("Delete", deleteDiscovery,("class","btn")) 
				else submit("Delete", deleteDiscovery,("class","btn"), ("disabled","disabled"))
			bind("form", xhtml, 
				 "title" 	-> textarea(discovery.title.is match {
						case null => "Titel er ikke endnu angivet"
						case title => title
				}, discovery.is.title(_)),
				 "description" 	-> textarea(discovery.description.is, discovery.is.description(_)),
				 "imageDescription" 	-> textarea(imageDescription.is, imageDescription(_)),
				 "year" 		-> text(discovery.is.year.is.toString, (in: String) => discovery.is.year(Integer.parseInt(in))),
	 			 "source" 		-> multiSelect(sourceOptions, discovery.sources.map{ s => 
						s.name.is
					}, processSources(_)),
				 "reference" 	-> text(discovery.is.reference.is,discovery.is.reference(_)),
				 "field" 		-> selectObj[Field](fieldOptions,Full(discovery.field.obj match {
						case Full(f) => f
						case _ => Field.create
				}),discovery.is.field(_)),
				 "isIdle" -> checkbox(discovery.isIdle, discovery.isIdle(_)),
 				 "imageUpload" -> fileUpload(saveFile _),
				 "submit" 		-> submit("Gem", processSubmit,("class","btn")),
				 "delete" 		-> deleteBtn
				)
		} else {
			S.error("I'm sorry, but you have to add a field before you can add a discovery")
			bind("form", xhtml, 
				 "title" 	-> Text(""),
				 "description" 	-> Text(""),
				 "year" 		-> Text(""),
	 			 "source" 		-> Text(""), 
				 "reference" 	-> Text(""),
				 "field" 		-> Text(""),
				 "isIdle" -> Text(""),
				 "imageUpload" -> Text(""),
				 "submit" 		-> Text(""),
				 "delete" 		-> Text("")
				)
		}
	 }
	
	/*
		This methods display all of the discoveries in a sortable table using the tablesorter widget
	*/
	def displayDiscoveries(xhtml: NodeSeq): NodeSeq = {
		bind("discoveries", xhtml,
		 	 "tablesorter" -> TableSorter("table"),
			 "discoveries" -> Discovery.findAll.flatMap{
				discovery => 
				 bind("discovery", chooseTemplate("discoveries","discoveries",xhtml), 
						AttrBindParam("img",Text("/images/%s".format(discovery.imageName)),"src"),
						"title" -> Text(discovery.title.is match {
								case null => "Titel er ikke endnu angivet"
								case title => title
						}),
					  "description" -> Text(discovery.description),
					  "dependencies" -> Text(discovery.dependencies.map{ d: Discovery => d.title.is match {
								case null => "Titel er ikke endnu angivet"
								case title => title
							}}.mkString(",")),
					  AttrBindParam("link",Text("/discovery/" + discovery.id),"href"),
					  "year" -> Text(discovery.year.toString),
					  "fielddd" -> Text(discovery.field.obj match {
							case Full(field) => field.name
							case _ => "No field"
						}),
					  "reference" -> Text(discovery.reference),
					  "source" -> Text(discovery.sources.map(sci => sci.name.is).mkString(",")),
						"isIdle" -> Text( discovery.isIdle.is match {
							case true => "Idle"
							case false => "Active"
						}))
			})	
	}
	
	
}