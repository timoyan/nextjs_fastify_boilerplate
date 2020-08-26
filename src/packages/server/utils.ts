import Prometheus from 'prom-client';

export const httpRequestDurationSeconds = new Prometheus.Histogram({
    name: 'http_request_duration_seconds',
    help: 'Duration of HTTP requests in seconds',
    labelNames: ['method', 'action', 'code', 'controller'],
    buckets: [
        0.001,
        0.002,
        0.004,
        0.008,
        0.016,
        0.032,
        0.064,
        0.128,
        0.256,
        0.512,
        1.024,
        2.048,
        4.096,
        8.192,
        16.384,
        32.768,
    ],
});

export const isMobile = (userAgent: string, chUAMobile: string): boolean => {
    return chUAMobile.includes('1')
        ? true
        : /Android|webOS|iPhone|iPad|iPod|BlackBerry|BB|PlayBook|IEMobile|Windows Phone|Kindle|Silk|Opera Mini/i.test(
              userAgent
          );
};
