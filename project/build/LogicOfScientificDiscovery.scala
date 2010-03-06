import sbt._

class LogicOfScientificDiscovery(info: ProjectInfo) extends DefaultWebProject(info)
{
	val mapper = "net.liftweb" % "lift-mapper" % "2.0-M3" % "compile" 
	val widgets = "net.liftweb" % "lift-widgets" % "2.0-M3" % "compile" 
	val jetty6 = "org.mortbay.jetty" % "jetty" % "6.1.14" % "test" 
	val servlet = "javax.servlet" % "servlet-api" % "2.5" % "provided"
	val derby = "org.apache.derby" % "derby" % "10.2.2.0" % "runtime"
	val junit = "junit" % "junit" % "3.8.1" % "test"
	val mysql = "mysql" % "mysql-connector-java" % "5.0.8" % "compile"
	// required because Ivy doesn't pull repositories from poms 
	val smackRepo = "m2-repository-smack" at "http://maven.reucon.com/public"
}