package sidewayscoding.model

import net.liftweb.mapper._
import net.liftweb.util._
import net.liftweb.common._
import net.liftweb.http._
import net.liftweb.util._
import Helpers._
import scala.xml._

class ImageBlob extends LongKeyedMapper[ImageBlob] with IdPK {
  def getSingleton = ImageBlob
 
  object image extends MappedBinary(this)
}
 
object ImageBlob extends ImageBlob with LongKeyedMetaMapper[ImageBlob]

class ImageInfo extends LongKeyedMapper[ImageInfo] with IdPK {
  def getSingleton = ImageInfo
 
  object date extends MappedLong(this) {
    override def defaultValue = Helpers.millis
  }
  object mimeType extends MappedPoliteString(this, 64)
	object description extends MappedText(this)
  object imgName extends MappedPoliteString(this, 256) {
    override def dbIndexed_? = true
    override def defaultValue = ""

    private def noSlashes(s: String) : List[FieldError] =
      if (s.contains("/"))
				List(FieldError(this, Text("Image name \"" + s + "\" may not contain \"/\"")))
      else
				Nil

    override def validations =
      valMinLen(1, "Image name must not be empty") _ ::
      valUnique("Image name must be unique") _ ::
      noSlashes _ ::
      super.validations
  }

  object imgBlob extends MappedLongForeignKey(this, ImageBlob)

  def deleteWithBlob {
    this.imgBlob.obj match {
      case Full(x) => x.delete_!
      case _ =>
    }
    this.delete_!
  }
}
 
object ImageInfo extends ImageInfo with LongKeyedMetaMapper[ImageInfo] {
  private object cache extends RequestMemoize[String, Box[ImageInfo]]
 
  private def findFromRequest(req: Req): Box[ImageInfo] = {
    val toFind = req.path.wholePath.last
    cache.get(toFind, find(By(imgName, toFind)))
  }
  
	def serveImage: LiftRules.DispatchPF = { 
	    case req @ Req("images" :: _ :: Nil, _, GetRequest) if findFromRequest(req).isDefined => () => { 
	        val info = findFromRequest(req).open_! // open is valid here because we just tested in the guard 
	        // Test for expiration 
	        req.testFor304(info.date, "Expires" -> toInternetDate(millis + 30.days)) or 
	        // load the blob and return it 
	        info.imgBlob.obj.map(blob => InMemoryResponse(blob.image, 
					List(
						("Last-Modified", toInternetDate(info.date.is)), 
						("Expires", toInternetDate(millis + 30.days)), 
						("Content-Type", info.mimeType.is)), Nil,  200)) 
	      } 
	  }

  def choices = ImageInfo.findAll.map({ i => (i.id.toString, i.imgName.toString) })
}
