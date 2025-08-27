import { useState, useEffect } from "react";

interface AssetLoaderOptions {
    models?: string[];
    textures?: string[];
    fonts?: string[];
    minimumLoadTime?: number; // Minimum time to show loader (prevents flash)
}

interface LoaderState {
    isLoading: boolean;
    progress: number;
    error: string | null;
    loadedAssets: number;
    totalAssets: number;
}

export function useAssetLoader(options: AssetLoaderOptions = {}): LoaderState {
    const [state, setState] = useState<LoaderState>({
        isLoading: true,
        progress: 0,
        error: null,
        loadedAssets: 0,
        totalAssets: 0,
    });

    useEffect(() => {
        const loadAssets = async () => {
            const {
                models = [],
                textures = [],
                fonts = [],
                minimumLoadTime = 2000,
            } = options;
            const allAssets = [...models, ...textures, ...fonts];
            const totalAssets = allAssets.length;

            setState((prev) => ({ ...prev, totalAssets }));

            const startTime = Date.now();
            let loadedCount = 0;

            try {
                // Load models
                for (const modelPath of models) {
                    await loadModel(modelPath);
                    loadedCount++;
                    updateProgress(loadedCount, totalAssets);
                }

                // Load textures
                for (const texturePath of textures) {
                    await loadTexture(texturePath);
                    loadedCount++;
                    updateProgress(loadedCount, totalAssets);
                }

                // Load fonts
                for (const fontPath of fonts) {
                    await loadFont(fontPath);
                    loadedCount++;
                    updateProgress(loadedCount, totalAssets);
                }

                // Ensure minimum load time for smooth UX
                const elapsed = Date.now() - startTime;
                if (elapsed < minimumLoadTime) {
                    await new Promise((resolve) =>
                        setTimeout(resolve, minimumLoadTime - elapsed)
                    );
                }

                setState((prev) => ({
                    ...prev,
                    isLoading: false,
                    progress: 100,
                    loadedAssets: totalAssets,
                }));
            } catch (error) {
                setState((prev) => ({
                    ...prev,
                    isLoading: false,
                    error:
                        error instanceof Error
                            ? error.message
                            : "Failed to load assets",
                }));
            }
        };

        const updateProgress = (loaded: number, total: number) => {
            const progress = total > 0 ? (loaded / total) * 100 : 0;
            setState((prev) => ({
                ...prev,
                progress,
                loadedAssets: loaded,
            }));
        };

        loadAssets();
    }, []);

    return state;
}

// Asset loading functions
async function loadModel(path: string): Promise<void> {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log(`Loaded model: ${path}`);
            resolve();
        }, Math.random() * 500 + 200);
    });
}

async function loadTexture(path: string): Promise<void> {
    return new Promise((resolve, reject) => {
        const img = new Image();
        img.onload = () => resolve();
        img.onerror = () =>
            reject(new Error(`Failed to load texture: ${path}`));
        img.src = path;
    });
}

async function loadFont(fontFamily: string): Promise<void> {
    return new Promise((resolve, reject) => {
        if ("fonts" in document) {
            document.fonts
                .load(`16px ${fontFamily}`)
                .then(() => {
                    console.log(`Loaded font: ${fontFamily}`);
                    resolve();
                })
                .catch(reject);
        } else {
            setTimeout(resolve, 100);
        }
    });
}
