package com.rapiddocs.java.utils;

import com.squareup.javapoet.CodeBlock;
import com.squareup.javapoet.TypeName;
import org.apache.commons.lang3.StringUtils;
import org.commonmark.node.Paragraph;
import org.commonmark.parser.Parser;
import org.commonmark.renderer.Renderer;
import org.commonmark.renderer.html.CoreHtmlNodeRenderer;
import org.commonmark.renderer.html.HtmlRenderer;

public final class JavaDocUtils {

    private static final Parser PARSER = Parser.builder().build();
    private static final Renderer DEFAULT_RENDERER =
            HtmlRenderer.builder().escapeHtml(true).build();

    private static final Renderer RENDERER_WITHOUT_OUTER_PARAGRAPH_TAGS = HtmlRenderer.builder()
            .escapeHtml(true)
            .nodeRendererFactory(context -> new CoreHtmlNodeRenderer(context) {
                private boolean firstParagraph = true;

                @Override
                public void visit(Paragraph paragraph) {
                    // Exclude the first set of paragraph tags for javadoc style.
                    if (firstParagraph) {
                        firstParagraph = false;
                        visitChildren(paragraph);
                    } else {
                        super.visit(paragraph);
                    }
                }
            })
            .build();

    public static String render(String docs) {
        return render(docs, false);
    }

    public static String render(String docs, boolean excludeOuterParagraphTags) {
        String rawDocs = StringUtils.stripToEmpty(docs).replace("$", "$$");
        if (StringUtils.isBlank(rawDocs)) {
            return "";
        }
        String renderedHtml = excludeOuterParagraphTags
                ? RENDERER_WITHOUT_OUTER_PARAGRAPH_TAGS.render(PARSER.parse(rawDocs))
                : DEFAULT_RENDERER.render(PARSER.parse(rawDocs));
        return StringUtils.appendIfMissing(renderedHtml, "\n").replaceAll("<br />", "");
    }

    public static String getParameterJavadoc(String paramName, String docs) {
        return "@param " + paramName + " " + docs + "\n";
    }

    public static CodeBlock getThrowsJavadoc(TypeName typeName, String docs) {
        return CodeBlock.of("@throws $T $L \n", typeName, docs);
    }

    public static String getReturnDocs(String returnDocs) {
        if (returnDocs.startsWith("returns") || returnDocs.startsWith("Returns")) {
            return "@return " + render(returnDocs.substring(7).strip());
        }
        return "@return " + render(returnDocs, true);
    }

    private JavaDocUtils() {}
}
