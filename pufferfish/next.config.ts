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
};

export default nextConfig;
