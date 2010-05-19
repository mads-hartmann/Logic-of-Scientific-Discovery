package bootstrap.liftweb

import net.liftweb.util._
import net.liftweb.http._
import net.liftweb.sitemap._
import net.liftweb.sitemap.Loc._
import Helpers._
import net.liftweb.mapper.{DB, ConnectionManager, Schemifier, DefaultConnectionIdentifier, ConnectionIdentifier}
import java.sql.{Connection, DriverManager}
import sidewayscoding.model._
import javax.servlet.http.{HttpServletRequest}
import net.liftweb.common._
import provider.HTTPRequest
import net.liftweb.widgets.tablesorter._
import xml.NodeSeq

import sidewayscoding.api.{RestAPI}

/**
  * A class that's instantiated early and run.  It allows the application
  * to modify lift's environment
  */
class Boot {
  def boot {
    
     if (!DB.jndiJdbcConnAvailable_?)
        DB.defineConnectionManager(DefaultConnectionIdentifier, DBVendor)
    
    // where to search snippet
    LiftRules.addToPackages("sidewayscoding")

    // go go OR mapping
    Schemifier.schemify(true, Log.infoF _, Award, Discovery, Field, Scientist, DiscoverySource, AwardSource, DiscoveryDependency, ImageBlob, ImageInfo)

    // Build SiteMap
    val entries = List(	Menu(Loc("Home", List("index"), "Home")),
												Menu(Loc("Person", List("person"), "Person")),
								  			Menu(Loc("Discovery", List("discovery"), "Discovery")),
												Menu(Loc("Dependency", List("dependency"), "Dependency")),
												Menu(Loc("Field", List("field"), "Field")),
												Menu(Loc("Award", List("award"), "Award")),
												Menu(Loc("Timeline", List("timeline"), "Timeline")))
					
    LiftRules.setSiteMap(SiteMap(entries:_*))
    
	// Rewrite rules, rules! ;)
    LiftRules.rewrite.append {
      case RewriteRequest( 
           ParsePath(List("person",id),_,_,_),_,_) =>
           RewriteResponse("person" :: Nil, Map("id" -> id))
      case RewriteRequest( 
           ParsePath(List("discovery",id),_,_,_),_,_) =>
           RewriteResponse("discovery" :: Nil, Map("id" -> id))
      case RewriteRequest( 
           ParsePath(List("field",id),_,_,_),_,_) =>
           RewriteResponse("field" :: Nil, Map("id" -> id))
      case RewriteRequest( 
           ParsePath(List("award",id),_,_,_),_,_) =>
           RewriteResponse("award" :: Nil, Map("id" -> id))
      case RewriteRequest( 
           ParsePath(List("dependency",id),_,_,_),_,_) =>
           RewriteResponse("dependency" :: Nil, Map("id" -> id))
    }
	
	LiftRules.dispatch.prepend(RestAPI.dispatch)
	LiftRules.statelessDispatchTable.append(ImageInfo.serveImage)
	
    /*
    * Show the spinny image when an Ajax call starts
     */
    LiftRules.ajaxStart =
      Full(() => LiftRules.jsArtifacts.show("ajax-loader").cmd)

    /*
     * Make the spinny image go away when it ends
     */
    LiftRules.ajaxEnd =
      Full(() => LiftRules.jsArtifacts.hide("ajax-loader").cmd)

    LiftRules.early.append(makeUtf8)

    S.addAround(DB.buildLoanWrapper)
    
  }
  
  private def makeUtf8(req: HTTPRequest) {
     req.setCharacterEncoding("UTF-8")
   }

	// widgets
	TableSorter.init()
  
}

object DBVendor extends ConnectionManager {
 def newConnection(name : ConnectionIdentifier) = {
   try {
     Class.forName("com.mysql.jdbc.Driver")
		val dm = DriverManager.getConnection("jdbc:mysql://localhost:8889/logicOfScientificDiscovery?user=root&password=root&characterEncoding=UTF-8")
		// val dm = DriverManager.getConnection("jdbc:mysql://ec2-174-129-9-255.compute-1.amazonaws.com:3306/LogicOfScientificDiscovery?user=logic&password=hummer19&characterEncoding=UTF-8")
     Full(dm)
   } catch {
     case e : Exception => e.printStackTrace; Empty
   }
 }
 def releaseConnection(conn: Connection) {conn.close}
}





