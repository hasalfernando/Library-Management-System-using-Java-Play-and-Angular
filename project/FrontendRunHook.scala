import java.net.InetSocketAddress

import play.sbt.PlayRunHook
import sbt._

import scala.sys.process.Process

object FrontendRunHook {
  
  def apply(base: File): PlayRunHook = {
    
    object UIBuilder extends PlayRunHook {

      var process: Option[Process] = None

      var npmInstall: String = FrontendCommands.dependencyInstall
      var npmRun: String = FrontendCommands.serve

      npmInstall = "cmd /c" + npmInstall
      npmRun = "cmd /c" + npmRun


      override def beforeStarted(): Unit = {
        if (!(base / "gui" / "node_modules").exists()){
          Process(npmInstall, base / "gui")
        }
      }

      override def afterStarted(addr: InetSocketAddress): Unit = {
        process = Option(
          Process(npmRun, base / "gui").run
        )
      }

      override def afterStopped(): Unit = {
        process.foreach(_.destroy())
        process = None
      }

    }

    UIBuilder
  }
}