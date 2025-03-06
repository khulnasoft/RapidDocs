configPath=$1

cd /model
java -cp model.jar:lib/* com.rapiddocs.java.model.Cli "$configPath"
