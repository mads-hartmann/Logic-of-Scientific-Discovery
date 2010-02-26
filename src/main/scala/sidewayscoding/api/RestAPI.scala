package sidewayscoding.api

import _root_.net.liftweb.util._
import _root_.net.liftweb.http._
import Helpers._
import net.liftweb.common._
import provider.HTTPRequest

import net.liftweb._
import util.Helpers._
import mapper._
import http.S._
import _root_.net.liftweb.http.js._
import JsCmds._
import JE._
import S._
import http.{S, RequestVar, SessionVar}
import http.SHtml._
import http.provider.HTTPCookie
import common._

import model.{Discovery, Field}

object RestAPI  {
	
	def dispatch: LiftRules.DispatchPF = {
		case Req(List("json","discoveries"), "", GetRequest) => () => discoveriesJSON()
	}
	
	def discoveriesJSON(): Box[LiftResponse] = {
		Full(JavaScriptResponse(
			JsArray((Discovery.findAll.map{ discovery: Discovery => JsObj( 
				"id" -> discovery.id.toString,
				"description" -> discovery.description.is,
				"year" -> discovery.year.is.toString,
				"field" -> discovery.field.obj.open_!.name.is,
				"dependencies" -> JsArray((discovery.dependencies.map{ dependency => dependency.id.toString }): _*)
			)}): _* ))
		)
	}
}