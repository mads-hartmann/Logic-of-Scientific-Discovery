package sidewayscoding

import _root_.java.io.File
import _root_.junit.framework._
import Assert._
import _root_.scala.xml.XML
import _root_.net.liftweb.util._

import _root_.scala.xml.{NodeSeq, Text}
import _root_.net.liftweb.http._
import _root_.net.liftweb.common._
import _root_.net.liftweb.util.Helpers._
import sidewayscoding.model.{Discovery, Field, Scientist,DiscoverySource,DiscoveryDependency,Award,Institution}
import _root_.bootstrap.liftweb.Boot

object AppTest {
  def suite: Test = {
    val suite = new TestSuite(classOf[AppTest])
    suite
  }

  def main(args : Array[String]) {
    _root_.junit.textui.TestRunner.run(suite)
  }
}

/**
 * Unit test for simple App.
 */
class AppTest extends TestCase("app") {

  /**
   * Rigourous Tests :-)
   */
  def testOK() = assertTrue(true)


	/** ----------------------------------------------------------------------------
   * Tests by Mads Hartmann Jensen 
   ------------------------------------------------------------------------------- */

	/* __ DISCOVERY & DISCOVERYSOURCE __
		 The following tests checks the following constraints are in place 
				- The description has to be atleat one char long 
				- The Source has to be born before the discovery and still alive when it was made 
				- The discovery can't be made in the future (after the current year)
	*/
	def testDiscoveryValidAttributes() = {
		
    val b = new Boot()
    b.boot

		val field = Field.findAll.first
		val source = Scientist.create.birth(1989).death(2008)
		
		// can't save a discovery without any information
		val discovery = Discovery.create
		assertFalse(Discovery.trySave(discovery))
		
		// make a totally valid discovery to see if it saves. 
		discovery.field(field).isExperiment(true).description("lolcatz").year(2000)
		assertTrue(Discovery.trySave(discovery)) // should be able to save it.												 
		discovery.delete_! // remove it again 
		
		// empty description 
		discovery.description("")
		assertFalse(Discovery.trySave(discovery)) 
		
		// made after today 
		discovery.year(2020)
		assertFalse(Discovery.trySave(discovery))
		
		// source is born after
		discovery.year(1988)
		assertFalse(DiscoverySource.join(source,discovery))
		
		// source is dead before 
		discovery.year(2009)
		assertFalse(DiscoverySource.join(source,discovery))	
	}
	
	/* __ DISCOVERY_DEPENDENCY __
		 The following tests checks the following constraints are in place 
				-C1: A discovery can't be dependent of a discovery made after this one
				-C2: A discovery can't be dependent of itself 
	*/
	def testDiscoveryDependency() = {
		val b = new Boot()
    b.boot
		
		val d1 = Discovery.create.description("test1").year(1900)
		val d2 = Discovery.create.description("test2").year(1989)
		
		assertFalse( DiscoveryDependency.join(d1,d2) match { // C1
			case Full(dd) => true
			case _ => false 
		})
		
		assertFalse( DiscoveryDependency.join(d1,d1) match { // C2
			case Full(dd) => true
			case _ => false 
		})
				
	}
	
	
	/* __ FIELD __
		 The following tests checks the following constraints are in place 
				-C1: The name can't be empty
	*/
	def testField() = {
		val b = new Boot()
    b.boot
		
		val f = Field.create.name("")
		
		assertFalse(Field.trySave(f))
		
		f.name("Test")
		assertTrue(Field.trySave(f))
		f.delete_!
		
	}
	
	/* __ SOURCE __
		 The following tests checks the following constraints are in place 
				-C1: Can't die before it's born
				-C2: Has to have a name
	*/
	def testSource() = {
		
		val b = new Boot()
    b.boot
		
		// test the common attributes for lab and scientist on a scientist
		val s = Scientist.create.birth(1989).death(1900).name("long name (TEST)").nationality("Dansih") //C1
		assertFalse(Scientist.trySave(s))
		
		s.name("").death(2009) // C2
		assertFalse(Scientist.trySave(s))
		
		// scientist specific 
		s.nationality("")
		assertFalse(Scientist.trySave(s))
	}
	
	/* __ AWARD __
		 The following tests checks the following constraints are in place 
				-C1: Has to have a name
				-C2: the year can't be after the current one
	*/
	def testAward() = {
		val b = new Boot()
    b.boot
		
		val a = Award.create.name("").year(1989)
		assertFalse(Award.trySave(a)) //C1
		
		a.name("validName(Test)").year(2020)
		assertFalse(Award.trySave(a)) //C2		
	}


	/* __ INSTITUTION __
		 The following tests checks the following constraints are in place 
				-C1: Has to have a name
				-C2: Has to have a nationality
	*/
	def testInstitution() = {
		val b = new Boot()
    b.boot
		
		val i = Institution.create.name("").nationality("validNationality")
		assertFalse(Institution.trySave(i)) //C1
		
		i.name("validName").nationality("")
		assertFalse(Institution.trySave(i)) //C2
		
	}
	


  /**
   * Tests to make sure the project's XML files are well-formed.
   *
   * Finds every *.html and *.xml file in src/main/webapp (and its
   * subdirectories) and tests to make sure they are well-formed.
   */
  def testXml() = {
    var failed: List[File] = Nil

    def handledXml(file: String) =
      file.endsWith(".xml")

    def handledXHtml(file: String) =
      file.endsWith(".html") || file.endsWith(".htm") || file.endsWith(".xhtml")

    def wellFormed(file: File) {
      if (file.isDirectory)
        for (f <- file.listFiles) wellFormed(f)

      if (file.isFile && handledXml(file.getName)) {
        try {
          XML.loadFile(file)
        } catch {
          case e: _root_.org.xml.sax.SAXParseException => failed = file :: failed
        }
      }
      if (file.isFile && handledXHtml(file.getName)) {
        PCDataXmlParser(new java.io.FileInputStream(file.getAbsolutePath)) match {
          case Full(_) => // file is ok
          case _ => failed = file :: failed
        }
      }
    }

    wellFormed(new File("src/main/webapp"))

    val numFails = failed.size
    if (numFails > 0) {
      val fileStr = if (numFails == 1) "file" else "files"
      val msg = "Malformed XML in " + numFails + " " + fileStr + ": " + failed.mkString(", ")
      println(msg)
      fail(msg)
    }
  }
}
