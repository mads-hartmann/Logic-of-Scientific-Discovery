package sidewayscoding.api

import net.liftweb.util._
import net.liftweb.http._
import Helpers._
import net.liftweb.common._
import provider.HTTPRequest
import xml.{Text, NodeSeq}

import net.liftweb._
import util.Helpers._
import mapper._
import http.S._
import net.liftweb.http.js._
import JsCmds._
import JE._
import S._
import http.{S, RequestVar, SessionVar}
import http.SHtml._
import http.provider.HTTPCookie
import common._

import sidewayscoding.model.{Discovery, Field, Scientist, Award, ImageInfo}

object RestAPI  {
	
	def dispatch: LiftRules.DispatchPF = {
		case Req(List("json","discoveries"), "", GetRequest) => () => discoveriesJSON()
		case Req(List("json","scientists"),"", GetRequest) => () => sourcesJSON()
		case Req(List("json","scientist",name),"", GetRequest) => () => getScientist(name)
		case Req(List("json","scientist",name),"", PostRequest) => () => getScientist(name)
		case Req(List("json","markup","scientist",name),"", GetRequest) => () => getMarkupForScientist(name)
		case Req(List("json","markup","discovery",id),"", GetRequest) => () => getMarkupForDiscovery(id)
		case Req(List("json","discovery",id,"image"),"", GetRequest) => () => getImage(id)
	}
		
	def getImage(id: String) = {
		Discovery.find(By(Discovery.id,Integer.parseInt(id))) match {
			case Full(disc) => disc.image match {
				// case Full(image) => Full(JavaScriptResponse(JsObj(
				// 					"id" -> image.id.toString,
				// 					"description" -> image.description.toString,
				// 					"name" -> image.imgName.toString
				// 				)))
				case Full(image) => Full(JavaScriptResponse( JsCrVar("description", image.description.toString)))
				case _ => Full(JavaScriptResponse(Str("no image")))
			}
			case _ => Full(JavaScriptResponse(Str("no discovery")))
		}
	}
		
	def discoveriesJSON(): Box[LiftResponse] = {
		Full(JavaScriptResponse(
			JsArray((Discovery.findAll
				.filter( !_.isIdle )
				.map{ discovery: Discovery => JsObj( 
				"id" -> discovery.id.toString,
				"description" -> discovery.description.is,
				"year" -> discovery.year.is.toString,
				"field" -> discovery.field.obj.open_!.name.is.trim,
				"dependencies" -> JsArray((discovery.dependenciesWithComments.map{ tuple => 
					JsObj(
						"id"-> tuple._1.id.toString,
						"comment" -> tuple._2.toString) 
				}): _*)
			)}): _* ))
		)
	}
  
	def getMarkupForDiscovery(id: String) = {
		
		def bindDependencies(xhtml: NodeSeq, discovery :Discovery) = {
			discovery.dependencies.flatMap{ dependency => 
				bind( "dependency", chooseTemplate("discovery","dependencies",xhtml),
							"name" -> dependency.title.is,
							"id" -> dependency.id.is.toString
			)}
		}
		
		def bindDependents(xhtml: NodeSeq, discovery: Discovery): NodeSeq = {
			discovery.dependents.flatMap{ dependent => 
				bind( "dependent", chooseTemplate("discovery","dependents",xhtml),
							"name" -> dependent.title.is,
							"id" -> dependent.id.is.toString
			)}
		}
		
		Full(JavaScriptResponse(
			JsCrVar("createMarkup", TemplateFinder.findAnyTemplate(List("discovery_facebox")) match {
				case Full(nodeseq) => Discovery.find(By(Discovery.id, Integer.parseInt(id))) match {
						case Full(discovery) => Jx(
							bind("discovery", nodeseq, 
								"title" -> discovery.title.is,
								"description" -> discovery.description.is,
								"year" -> discovery.year.is.toString,
								AttrBindParam("image", {if(discovery.imageName == null) "" else "/images/%s".format(discovery.imageName.toString)}, "src"),
								AttrBindParam("id", discovery.id.is, "rel"),
								AttrBindParam("imagehref", {if(discovery.imageName == null) "" else "/images/%s".format(discovery.imageName.toString)}, "href"),
								"sources" -> discovery.sources.map{source: Scientist => source.name.is.toString}.mkString(","),
								"dependencies" -> bindDependencies(nodeseq,discovery),
								"dependents" -> bindDependents(nodeseq,discovery))).toJs
						case _ => Str("Couldnt find discovery")
					}
				case Empty => Jx(<h1>No template found</h1>).toJs	
			}
		)))
	}

	def getMarkupForScientist(name: String) = {
		Full(JavaScriptResponse(
			JsCrVar("createMarkup", TemplateFinder.findAnyTemplate(List("scientist_facebox")) match {
					case Full(nodeseq) => 
						Scientist.find(By(Scientist.name, name)) match {
							case Full(scientist) => 
								Jx(
									bind("scientist", nodeseq, 
										"birth" -> scientist.birth.toString,
										"death" -> scientist.death.toString,
										"name" -> scientist.name.is,
										AttrBindParam("image", {if(scientist.imageName == null) "" else "/images/%s".format(scientist.imageName.toString)}, "src"),
										"discoveries" -> {
											if (scientist.discoveries.size > 0) {
												scientist.discoveries.flatMap{ discovery => 
													bind("discovery", chooseTemplate("scientist","discoveries",nodeseq), 
														"name" -> discovery.title.is,
														"year" -> discovery.year.is.toString,
														"id" -> discovery.id.is.toString,
														"field" -> discovery.field.obj.map{field: Field => field.name.is.toString.trim}.openOr(""))
													}
											} else {
												Text("")
											}
									})
									).toJs
							case _ => Jx(<h1>No template found</h1>).toJs
					}
					case _ => Jx(<h1>No template found</h1>).toJs	
			})
		))
	}
	
	def getScientist(name :String) = {
		Full(JavaScriptResponse(
			Scientist.find(By(Scientist.name, name)) match {
				case Full(scientist) => JsObj(
					"id" -> scientist.id.toString,
					"birth" -> scientist.birth.toString,
					"death" -> scientist.death.toString,
					"name" -> scientist.name.is,
					"nationality" -> scientist.nationality.is.toString,
					"imageUrl" ->{if(scientist.imageName == null) "" else "/images/%s".format(scientist.imageName.toString)},
					"discoveries" -> JsArray((scientist.discoveries.map{ discovery => 
						JsObj(
							"id" -> discovery.id.toString,
							"description" -> discovery.description.is,
							"year" -> discovery.year.is.toString,
							"field" -> discovery.field.obj.open_!.name.is.trim
						)
					}): _*),
					"awards" -> JsArray((scientist.awards.map{ award => Str(award.name.toString) }): _*))
				case _ => JsObj("error" -> "No scientsit by this name")
			}
			)
		)
	}
	
	def sourcesJSON(): Box[LiftResponse] = {
		Full(JavaScriptResponse(
			JsArray((Scientist.findAll.map{ scientist: Scientist => JsObj( 
				"id" -> scientist.id.toString,
				"birth" -> scientist.birth.toString,
				"death" -> scientist.death.toString,
				"name" -> scientist.name.is,
				"nationality" -> scientist.nationality.is.toString,
				"imageUrl" ->{if(scientist.imageName == null) "" else "/images/%s".format(scientist.imageName.toString)},
				"awards" -> JsArray((scientist.awards.map{ award => Str(award.name.toString) }): _*)
			)}): _* ))
		)
	}}

  
