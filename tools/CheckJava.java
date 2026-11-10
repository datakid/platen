import javax.tools.*;
import java.io.*;
import java.nio.file.*;
import java.util.*;

public class CheckJava {
    public static void main(String[] args) throws Exception {
        JavaCompiler compiler = ToolProvider.getSystemJavaCompiler();
        Path dir = Path.of(args[0]);
        Path out = Files.createTempDirectory("platen_java_out");
        List<Path> files = new ArrayList<>();
        try (var s = Files.list(dir)) {
            s.filter(p -> p.toString().endsWith(".java")).sorted().forEach(files::add);
        }
        for (Path f : files) {
            DiagnosticCollector<JavaFileObject> diags = new DiagnosticCollector<>();
            try (StandardJavaFileManager fm = compiler.getStandardFileManager(diags, null, null)) {
                Path o = Files.createTempDirectory(out, "c");
                var task = compiler.getTask(null, fm, diags, List.of("-d", o.toString(), "--release", "21", "-proc:none", "-Xlint:none"), null, fm.getJavaFileObjects(f.toFile()));
                boolean ok = task.call();
                String msg = "";
                for (var d : diags.getDiagnostics()) {
                    if (d.getKind() == Diagnostic.Kind.ERROR) {
                        msg = "line " + d.getLineNumber() + ": " + d.getMessage(Locale.ROOT).split("\n")[0];
                        break;
                    }
                }
                System.out.println(f.getFileName() + "\t" + (ok ? "OK" : "FAIL") + "\t" + msg);
            }
        }
    }
}
