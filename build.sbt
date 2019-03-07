name := """Westminster Library Program"""

version := "1.0-SNAPSHOT"

lazy val root = (project in file(".")).enablePlugins(PlayJava, PlayEbean).settings(
  watchSources ++= (baseDirectory.value / "public/gui" ** "*").get
)

scalaVersion := "2.12.2"

libraryDependencies ++= Seq(guice,evolutions,javaJdbc)

// Test Database
libraryDependencies += "com.h2database" % "h2" % "1.4.194"

libraryDependencies += "org.assertj" % "assertj-core" % "3.6.2" % Test
libraryDependencies += "org.awaitility" % "awaitility" % "2.0.0" % Test

testOptions in Test := Seq(Tests.Argument(TestFrameworks.JUnit, "-a", "-v"))
