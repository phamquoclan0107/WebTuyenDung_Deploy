package com.example.jobapp.Controller;

import com.example.jobapp.DTOs.JobPostingDTO;
import com.example.jobapp.DTOs.ProductDTO;
import com.example.jobapp.Entity.JobPosting.JobStatus;
import com.example.jobapp.service.JobPostingService;
import com.example.jobapp.service.ProductService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

/**
 * Sinh sitemap.xml động — Googlebot đọc qua nginx proxy.
 * nginx-spa.conf: location /sitemap.xml { proxy_pass http://app:8080/sitemap.xml; }
 */
@RestController
@RequiredArgsConstructor
public class SitemapController {

    private static final String BASE_URL = "https://chuyenkhoamat.com.vn";
    private static final DateTimeFormatter FMT = DateTimeFormatter.ofPattern("yyyy-MM-dd");

    private final ProductService    productService;
    private final JobPostingService jobPostingService;

    @GetMapping(value = "/sitemap.xml", produces = MediaType.APPLICATION_XML_VALUE)
    public ResponseEntity<String> sitemap() {
        StringBuilder sb = new StringBuilder();
        sb.append("<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n");
        sb.append("<urlset xmlns=\"http://www.sitemaps.org/schemas/sitemap/0.9\">\n");

        // Static pages
        addUrl(sb, BASE_URL + "/",         "daily",  "1.0", null);
        addUrl(sb, BASE_URL + "/products", "daily",  "0.9", null);
        addUrl(sb, BASE_URL + "/jobs",     "weekly", "0.7", null);

        // Products — dùng đúng signature: search(Integer categoryId, Boolean isActive, String name, Pageable)
        try {
            int p = 0;
            Page<ProductDTO.Response> result;
            do {
                result = productService.search(
                    null, true, null,
                    PageRequest.of(p, 100, Sort.by(Sort.Direction.DESC, "updatedAt"))
                );
                for (ProductDTO.Response prod : result.getContent()) {
                    String lastmod = prod.getUpdatedAt() != null
                        ? prod.getUpdatedAt().format(FMT)
                        : LocalDateTime.now().format(FMT);
                    addUrl(sb, BASE_URL + "/products/" + prod.getId(), "weekly", "0.8", lastmod);
                }
                p++;
            } while (result.hasNext());
        } catch (Exception ignored) {}

        // Jobs — dùng đúng signature: search(String keyword, String location, Integer categoryId, JobStatus status, Pageable)
        try {
            int p = 0;
            Page<JobPostingDTO.SummaryResponse> result;
            do {
                result = jobPostingService.search(
                    null, null, null, JobStatus.ACTIVE,
                    PageRequest.of(p, 100, Sort.by(Sort.Direction.DESC, "createdAt"))
                );
                for (JobPostingDTO.SummaryResponse job : result.getContent()) {
                    String lastmod = job.getCreatedAt() != null
                        ? job.getCreatedAt().format(FMT)
                        : LocalDateTime.now().format(FMT);
                    addUrl(sb, BASE_URL + "/jobs/" + job.getId(), "weekly", "0.6", lastmod);
                }
                p++;
            } while (result.hasNext());
        } catch (Exception ignored) {}

        sb.append("</urlset>");
        return ResponseEntity.ok()
            .contentType(MediaType.APPLICATION_XML)
            .body(sb.toString());
    }

    private void addUrl(StringBuilder sb, String loc, String changefreq, String priority, String lastmod) {
        sb.append("  <url>\n");
        sb.append("    <loc>").append(loc).append("</loc>\n");
        if (lastmod != null) sb.append("    <lastmod>").append(lastmod).append("</lastmod>\n");
        sb.append("    <changefreq>").append(changefreq).append("</changefreq>\n");
        sb.append("    <priority>").append(priority).append("</priority>\n");
        sb.append("  </url>\n");
    }
}
