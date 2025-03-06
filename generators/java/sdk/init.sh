configPath=$1

cd /sdk
java -cp sdk.jar:lib/* com.rapiddocs.java.client.Cli "$configPath"
