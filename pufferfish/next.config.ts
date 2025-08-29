import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    webpack: (config) => {
        // Add rule for .glb files
        config.module.rules.push({
            test: /\.(glb|gltf)$/,
            type: "asset/resource",
        });

        return config;
    },
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "placehold.co",
                pathname: "/**",
            },
            {
                protocol: "https",
                hostname: "i.pravatar.cc",
                pathname: "/**",
            },
            {
                protocol: "https",
                hostname: "picsum.photos",
                pathname: "/**",
            },
        ],
    },
};

export default nextConfig;
