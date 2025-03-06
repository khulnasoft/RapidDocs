configPath=$1

cd /spring
java -cp spring.jar:lib/* com.rapiddocs.java.spring.Cli "$configPath"
