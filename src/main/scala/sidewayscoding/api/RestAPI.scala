package sidewayscoding.api

import _root_.net.liftweb.util._
import _root_.net.liftweb.http._
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

import model.{Discovery, Field, Scientist, Lab, Award}

object RestAPI  {
	
	def dispatch: LiftRules.DispatchPF = {
		case Req(List("json","discoveries"), "", GetRequest) => () => discoveriesJSON()
		case Req(List("json","scientists"),"", GetRequest) => () => sourcesJSON()
		case Req(List("json","scientist",name),"", GetRequest) => () => getScientist(name)
		case Req(List("json","markup","scientist",name),"", GetRequest) => () => getMarkupForScientist(name)
		case Req(List("json","markup","discovery",id),"", GetRequest) => () => getMarkupForDiscovery(id)
	}
	
	def discoveriesJSON(): Box[LiftResponse] = {
		Full(JavaScriptResponse(
			JsArray((Discovery.findAll.map{ discovery: Discovery => JsObj( 
				"id" -> discovery.id.toString,
				"description" -> discovery.description.is,
				"year" -> discovery.year.is.toString,
				"isExperimental" -> discovery.isExperiment.toString,
				"field" -> discovery.field.obj.open_!.name.is,
				"dependencies" -> JsArray((discovery.dependencies.map{ dependency => dependency.id.toString }): _*)
			)}): _* ))
		)
	}
	
	def getMarkupForDiscovery(id: String) = {
		Full(JavaScriptResponse(
			JsCrVar("createMarkup", TemplateFinder.findAnyTemplate(List("discovery_facebox")) match {
				case Full(nodeseq) => Discovery.find(By(Discovery.id, Integer.parseInt(id))) match {
						case Full(discovery) => Jx(
							bind("discovery", nodeseq, 
								"description" -> discovery.description.is,
								"year" -> discovery.year.is.toString,
								"sources" -> discovery.sources.map{source => source match {
									case s :Scientist => s.name
									case l :Lab => l.name
								}}.mkString(","),
								"isExperimental" -> discovery.isExperiment.is.toString,
								"field" -> { discovery.field.obj match {
									case Full(field) => Text(field.name.is.toString)
									case _ => Text("")
								}},
								"dependencies" -> discovery.dependencies.flatMap{ dependency => 
									bind("dependency", chooseTemplate("discovery","dependencies",nodeseq),
										"description" -> dependency.description.is,
										"year" -> dependency.year.is.toString,
										"isExperimental" -> dependency.isExperiment.is.toString,
										"field" -> { dependency.field.obj match {
											case Full(field) => Text(field.name.is.toString)
											case _ => Text("")
										}})
								}
							)).toJs
						case _ => Jx(<h1>Couldnt find discovery</h1>).toJs	
					}
				case _ => Jx(<h1>No template found</h1>).toJs	
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
										"discoveries" -> scientist.discoveries.flatMap{ discovery => 
											bind("discovery", chooseTemplate("scientist","discoveries",nodeseq), 
												"description" -> Text(discovery.description.is),
												"year" -> Text(discovery.year.is.toString),
												"experiment" ->Text(discovery.isExperiment.is.toString),
												"field" -> { discovery.field.obj match {
													case Full(field) => Text(field.name.is.toString)
													case _ => Text("")
												}})
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
							"isExperimental" -> discovery.isExperiment.toString,
							"field" -> discovery.field.obj.open_!.name.is
						)
					}): _*),
					"awards" -> JsArray((scientist.awards.map{ award => award.name.toString }): _*))
				case _ => JsObj("error" -> "No scientsit by this name")
			}
			)
		)
	}
	
	def sourcesJSON(): Box[LiftResponse] = {
		Full(JavaScriptResponse(
			JsArray((Scientist.findAllCustom.map{ scientist: Scientist => JsObj( 
				"id" -> scientist.id.toString,
				"birth" -> scientist.birth.toString,
				"death" -> scientist.death.toString,
				"name" -> scientist.name.is,
				"nationality" -> scientist.nationality.is.toString,
				"imageUrl" ->{if(scientist.imageName == null) "" else "/images/%s".format(scientist.imageName.toString)},
				"awards" -> JsArray((scientist.awards.map{ award => award.name.toString }): _*)
			)}): _* ))
		)
	}
	
}