
import React, { useState, useEffect, useMemo } from 'react';
import { Select, OptionGroup } from './Select';
import { Tooltip } from './Tooltip';
import { Settings, ChevronUp, ChevronDown, Minus, Plus, Dices, Cpu } from 'lucide-react';
import { ModelOption, ProviderOption, AspectRatioOption, GenerationChannel } from '../types';
import { 
    HF_MODEL_OPTIONS, 
    GITEE_MODEL_OPTIONS, 
    MS_MODEL_OPTIONS,
    A4F_MODEL_OPTIONS,
    getModelConfig, 
    getGuidanceScaleConfig 
} from '../constants';
import { getCustomProviders, getServiceMode } from '../services/utils';
import { useAppStore } from '../store/appStore';
import { translations } from '../translations';
import { MAX_RESOLUTION, MIN_RESOLUTION, RESOLUTION_STEP, getClosestAspectRatio, normalizeResolution } from '../utils/resolution';

export const ControlPanel: React.FC = () => {
    const { 
        language,
        provider, setProvider,
        model, setModel,
        aspectRatio, setAspectRatio,
        generationResolution, setGenerationResolution,
        generationChannel, setGenerationChannel,
        hfAccessToken, setHfAccessToken,
        steps, setSteps,
        guidanceScale, setGuidanceScale,
        seed, setSeed,
        tokens,
        tokenStatus
    } = useAppStore();
    
    const t = translations[language];
    const [isAdvancedOpen, setIsAdvancedOpen] = useState(false);
    const [channelStrategy, setChannelStrategy] = useState<'auto' | 'manual'>('auto');
    const [modelOptions, setModelOptions] = useState<OptionGroup[]>([]);
    const resolutionGroups = useMemo(() => [
        {
            label: '1K',
            placeholderLabel: '1K 1:1 (1024x1024)',
            options: [
                { value: '1024x1024', displayLabel: '1K 1:1 (1024x1024)' },
                { value: '1024x576', displayLabel: '1K 16:9 (1024x576)' },
                { value: '576x1024', displayLabel: '1K 9:16 (576x1024)' },
                { value: '1024x768', displayLabel: '1K 4:3 (1024x768)' },
                { value: '768x1024', displayLabel: '1K 3:4 (768x1024)' }
            ]
        },
        {
            label: 'HD',
            placeholderLabel: 'HD 16:9 (1920x1088)',
            options: [
                { value: '1920x1088', displayLabel: 'HD 16:9 (1920x1088)' },
                { value: '1088x1920', displayLabel: 'HD 9:16 (1088x1920)' }
            ]
        },
        {
            label: '2K',
            placeholderLabel: '2K 1:1 (2048x2048)',
            options: [
                { value: '2048x2048', displayLabel: '2K 1:1 (2048x2048)' },
                { value: '2048x1152', displayLabel: '2K 16:9 (2048x1152)' },
                { value: '1152x2048', displayLabel: '2K 9:16 (1152x2048)' }
            ]
        }
    ], []);
    const resolutionToAspectRatio = useMemo<Record<string, AspectRatioOption>>(() => ({
        '1024x1024': '1:1',
        '1024x576': '16:9',
        '576x1024': '9:16',
        '1024x768': '4:3',
        '768x1024': '3:4',
        '1920x1088': '16:9',
        '1088x1920': '9:16',
        '2048x2048': '1:1',
        '2048x1152': '16:9',
        '1152x2048': '9:16'
    }), []);
    const defaultResolutionByAspectRatio = useMemo<Partial<Record<AspectRatioOption, string>>>(() => ({
        '1:1': '1024x1024',
        '16:9': '1024x576',
        '9:16': '576x1024',
        '4:3': '1024x768',
        '3:4': '768x1024'
    }), []);
    const selectedResolution = `${generationResolution.width}x${generationResolution.height}`;
    const channelOptions = useMemo(() => [
        { value: 'public', label: t.channelOptionPublic },
        { value: 'hf_token', label: t.channelOptionHfToken },
    ], [t]);
    const channelStrategyOptions = useMemo(() => [
        { value: 'auto', label: t.channelStrategyAuto },
        { value: 'manual', label: t.channelStrategyManual },
    ], [t]);

    // Build grouped model options dynamically
    useEffect(() => {
        const updateModelOptions = () => {
            const serviceMode = getServiceMode();
            const groups: OptionGroup[] = [];
            
            const showBase = serviceMode === 'local' || serviceMode === 'hydration';
            const showCustom = serviceMode === 'server' || serviceMode === 'hydration';

            // 1. Default Providers
            if (showBase) {
                // Hugging Face (Always visible)
                groups.push({
                    label: t.provider_huggingface,
                    options: HF_MODEL_OPTIONS.map(m => ({ label: m.label, value: `huggingface:${m.value}` }))
                });

                // Gitee (Only if token exists)
                if (tokens.gitee && tokens.gitee.length > 0) {
                    groups.push({
                        label: t.provider_gitee,
                        options: GITEE_MODEL_OPTIONS.map(m => ({ label: m.label, value: `gitee:${m.value}` }))
                    });
                }

                // Model Scope (Only if token exists)
                if (tokens.modelscope && tokens.modelscope.length > 0) {
                    groups.push({
                        label: t.provider_modelscope,
                        options: MS_MODEL_OPTIONS.map(m => ({ label: m.label, value: `modelscope:${m.value}` }))
                    });
                }

                // A4F (Only if token exists)
                if (tokens.a4f && tokens.a4f.length > 0) {
                    groups.push({
                        label: t.provider_a4f,
                        options: A4F_MODEL_OPTIONS.map(m => ({ label: m.label, value: `a4f:${m.value}` }))
                    });
                }
            }

            // 2. Custom Providers
            if (showCustom) {
                const customProviders = getCustomProviders();
                customProviders.forEach(cp => {
                    const models = cp.models.generate;
                    if (models && models.length > 0) {
                        groups.push({
                            label: cp.name,
                            options: models.map(m => ({
                                label: m.name,
                                value: `${cp.id}:${m.id}`
                            }))
                        });
                    }
                });
            }

            setModelOptions(groups);
        };

        updateModelOptions();
        // Listen for storage changes to update list dynamically (e.g. after adding token in settings)
        window.addEventListener('storage', updateModelOptions);
        return () => window.removeEventListener('storage', updateModelOptions);
    }, [t, tokens]);

    // Determine current model configuration (Standard or Custom)
    const activeConfig = useMemo(() => {
        const customProviders = getCustomProviders();
        // Try to find custom provider matching the ID
        const activeCustomProvider = customProviders.find(p => p.id === provider);
        
        if (activeCustomProvider) {
            // It's a custom provider
            const customModel = activeCustomProvider.models.generate?.find(m => m.id === model);
            
            if (customModel) {
                return {
                    isCustom: true,
                    steps: customModel.steps ? {
                        min: customModel.steps.range[0],
                        max: customModel.steps.range[1],
                        default: customModel.steps.default
                    } : null,
                    guidance: customModel.guidance ? {
                        min: customModel.guidance.range[0],
                        max: customModel.guidance.range[1],
                        step: 0.1,
                        default: customModel.guidance.default
                    } : null
                };
            }
        }

        // Fallback to standard config
        return {
            isCustom: false,
            steps: getModelConfig(provider, model),
            guidance: getGuidanceScaleConfig(model, provider)
        };
    }, [provider, model]);

    // Initialize defaults when model changes
    useEffect(() => {
        if (activeConfig.isCustom) {
            if (activeConfig.steps) {
                setSteps(activeConfig.steps.default);
            }
            if (activeConfig.guidance) {
                setGuidanceScale(activeConfig.guidance.default);
            }
        }
        // Standard provider defaults are handled in App.tsx effects, 
        // but custom ones need explicit handling here since App.tsx 
        // mainly relies on getModelConfig/constants.
    }, [activeConfig, setSteps, setGuidanceScale]);

    const handleRandomizeSeed = () => {
        setSeed(Math.floor(Math.random() * 2147483647).toString());
    };

    const handleAdjustSeed = (amount: number) => {
        const current = parseInt(seed || '0', 10);
        if (isNaN(current)) {
            setSeed((0 + amount).toString());
        } else {
            setSeed((current + amount).toString());
        }
    };

    // Handle Model Change: Parse "provider:modelId"
    const onModelChange = (val: string) => {
        // value format is "provider:modelId"
        const parts = val.split(':');
        if (parts.length >= 2) {
            const newProvider = parts[0] as ProviderOption;
            const newModel = parts.slice(1).join(':') as ModelOption; // Join back in case model ID has colons
            
            setProvider(newProvider);
            setModel(newModel);
        }
    };

    // Construct current value for Select
    const currentSelectValue = `${provider}:${model}`;
    const activeResolutionGroup = resolutionGroups.find(group => group.options.some(option => option.value === selectedResolution))?.label;
    const applyResolution = (width: number, height: number) => {
        const safeWidth = Number.isFinite(width) ? width : generationResolution.width;
        const safeHeight = Number.isFinite(height) ? height : generationResolution.height;
        const normalized = normalizeResolution(safeWidth, safeHeight);
        setGenerationResolution(normalized);
        const key = `${normalized.width}x${normalized.height}`;
        setAspectRatio(resolutionToAspectRatio[key] || getClosestAspectRatio(normalized.width, normalized.height));
    };
    const isBuiltInProvider = ['huggingface', 'gitee', 'modelscope', 'a4f'].includes(provider);
    const isCustomProvider = !isBuiltInProvider;
    const trimmedHfToken = hfAccessToken.trim();
    const hasHfToken = trimmedHfToken.length > 0;
    const isHfTokenValid = trimmedHfToken.startsWith('hf_');
    const isHfTokenLimited = hasHfToken && isHfTokenValid && !!tokenStatus?.huggingface?.exhausted?.[trimmedHfToken];
    const autoPreferredChannel: GenerationChannel =
        isCustomProvider && hasHfToken && isHfTokenValid && !isHfTokenLimited ? 'hf_token' : 'public';

    useEffect(() => {
        if (channelStrategy !== 'auto') return;
        if (generationChannel !== autoPreferredChannel) {
            setGenerationChannel(autoPreferredChannel);
        }
    }, [autoPreferredChannel, channelStrategy, generationChannel, setGenerationChannel]);

    const channelStatusText = useMemo(() => ({
        available: t.channelStatusAvailable,
        limited: t.channelStatusLimited,
        unavailable: t.channelStatusUnavailable
    }), [t]);

    const channelStatusRows = useMemo(() => {
        const publicStatus: 'available' | 'limited' | 'unavailable' = 'available';
        const hfStatus: 'available' | 'limited' | 'unavailable' =
            hasHfToken
                ? isHfTokenValid
                    ? (isHfTokenLimited ? 'limited' : 'available')
                    : 'unavailable'
                : 'unavailable';

        return [
            { key: 'public', label: t.channelOptionPublicShort, status: publicStatus },
            { key: 'hf_token', label: t.channelOptionHfTokenShort, status: hfStatus }
        ];
    }, [hasHfToken, isHfTokenLimited, isHfTokenValid, t]);

    const statusBadgeClass = (status: 'available' | 'limited' | 'unavailable') => {
        if (status === 'available') return 'text-emerald-300 bg-emerald-500/10 border-emerald-400/30';
        if (status === 'limited') return 'text-amber-300 bg-amber-500/10 border-amber-400/30';
        return 'text-rose-300 bg-rose-500/10 border-rose-400/30';
    };

    const minSamplingSteps = 4;
    const maxSamplingSteps = 20;
    const effectiveMinSamplingSteps = activeConfig.steps
        ? Math.max(minSamplingSteps, activeConfig.steps.min)
        : minSamplingSteps;
    const effectiveMaxSamplingSteps = activeConfig.steps
        ? Math.min(maxSamplingSteps, activeConfig.steps.max)
        : maxSamplingSteps;

    useEffect(() => {
        if (!activeConfig.steps) return;
        if (steps < effectiveMinSamplingSteps) {
            setSteps(effectiveMinSamplingSteps);
            return;
        }
        if (steps > effectiveMaxSamplingSteps) {
            setSteps(effectiveMaxSamplingSteps);
        }
    }, [activeConfig.steps, effectiveMaxSamplingSteps, effectiveMinSamplingSteps, setSteps, steps]);

    useEffect(() => {
        if (!generationResolution || !Number.isFinite(generationResolution.width) || !Number.isFinite(generationResolution.height)) {
            const defaultResolution = defaultResolutionByAspectRatio[aspectRatio] || '1024x1024';
            const [defaultWidth, defaultHeight] = defaultResolution.split('x').map(Number);
            applyResolution(defaultWidth, defaultHeight);
        }
    }, [aspectRatio, defaultResolutionByAspectRatio, generationResolution]);

    return (
        <div className="space-y-4 md:space-y-6">
            {/* Model Selection (Grouped) */}
            <Select
                label={t.model}
                value={currentSelectValue}
                onChange={onModelChange}
                options={modelOptions}
                icon={<Cpu className="w-5 h-5" />}
            />

            {/* Channel Selection */}
            <div className="space-y-3">
                <Select
                    label={t.channelStrategy}
                    value={channelStrategy}
                    onChange={(val) => setChannelStrategy(val as 'auto' | 'manual')}
                    options={channelStrategyOptions}
                />
                {channelStrategy === 'manual' ? (
                    <Select
                        label={t.channel}
                        value={generationChannel}
                        onChange={(val) => setGenerationChannel(val as GenerationChannel)}
                        options={channelOptions}
                    />
                ) : (
                    <div className="rounded-lg border border-white/10 bg-white/5 px-4 py-3">
                        <p className="text-white/45 text-xs">{t.channelAutoSelected}</p>
                        <p className="mt-1 text-white/85 text-sm">
                            {channelOptions.find((item) => item.value === generationChannel)?.label || channelOptions[0].label}
                        </p>
                    </div>
                )}

                <div className="rounded-lg border border-white/10 bg-white/5 px-4 py-3 space-y-2">
                    <p className="text-white/45 text-xs">{t.channelStatusTitle}</p>
                    {channelStatusRows.map((row) => (
                        <div key={row.key} className="flex items-center justify-between gap-2">
                            <span className="text-white/75 text-sm">{row.label}</span>
                            <span className={`text-xs px-2 py-0.5 rounded border ${statusBadgeClass(row.status)}`}>
                                {channelStatusText[row.status]}
                            </span>
                        </div>
                    ))}
                </div>

                {generationChannel === 'hf_token' && (
                    <div className="group">
                        <div className="flex items-center justify-between pb-2">
                            <p className="text-white/80 text-sm font-medium">{t.channelTokenLabel}</p>
                            <span className="text-white/40 text-xs">{t.channelTokenHint}</span>
                        </div>
                        <input
                            type="text"
                            value={hfAccessToken}
                            onChange={(e) => setHfAccessToken(e.target.value)}
                            placeholder={t.channelTokenPlaceholder}
                            className="form-input w-full h-12 bg-white/5 border border-white/10 rounded-lg text-white/90 placeholder:text-white/30 focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500 px-4 text-sm font-mono"
                        />
                    </div>
                )}
            </div>

            {/* Advanced Settings */}
            <div className="border-t border-white/5 pt-4">
                <button
                    type="button"
                    onClick={() => setIsAdvancedOpen(!isAdvancedOpen)}
                    className="flex items-center justify-between w-full text-left text-white/60 hover:text-purple-400 transition-colors group"
                >
                    <span className="text-sm font-medium flex items-center gap-2">
                        <Settings className="w-4 h-4 group-hover:rotate-45 transition-transform duration-300" />
                        {t.advancedSettings}
                    </span>
                    {isAdvancedOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                </button>

                <div className={`grid transition-[grid-template-rows] duration-300 ease-in-out ${isAdvancedOpen ? 'grid-rows-[1fr] mt-4' : 'grid-rows-[0fr]'}`}>
                    <div className="overflow-hidden">
                        <div className="space-y-5">
                            {/* Resolution Presets (1K / HD / 2K grouped selectors) */}
                            <div className="group">
                                <div className="flex items-center justify-between pb-2">
                                    <p className="text-white/80 text-sm font-medium">{t.dimensions}</p>
                                    <span className="text-white/40 text-xs">{activeResolutionGroup || '自定义'}</span>
                                </div>
                                <div className="flex flex-wrap gap-2">
                                    {resolutionGroups.map((group) => {
                                        const isActiveGroup = activeResolutionGroup === group.label;
                                        const selectValue = isActiveGroup ? selectedResolution : '';

                                        return (
                                            <select
                                                key={group.label}
                                                value={selectValue}
                                                onChange={(e) => {
                                                    const value = e.target.value;
                                                    if (!value) return;
                                                    const [width, height] = value.split('x').map(Number);
                                                    applyResolution(width, height);
                                                }}
                                                className={`px-3 py-1.5 text-sm rounded-lg border transition-colors cursor-pointer focus:outline-none ${
                                                    isActiveGroup
                                                        ? 'bg-indigo-600 border-indigo-500 text-white'
                                                        : 'bg-white/5 border-white/10 text-white/60 hover:text-white hover:border-white/20'
                                                }`}
                                                style={{ colorScheme: 'dark' }}
                                            >
                                                <option value="" disabled className="bg-[#141414] text-white/60">
                                                    {group.placeholderLabel}
                                                </option>
                                                {group.options.map((option) => (
                                                    <option key={option.value} value={option.value} className="bg-[#141414] text-white">
                                                        {option.displayLabel}
                                                    </option>
                                                ))}
                                            </select>
                                        );
                                    })}
                                </div>
                                <div className="grid grid-cols-2 gap-2 mt-3">
                                    <div className="space-y-1">
                                        <label className="text-white/60 text-xs">宽度</label>
                                        <input
                                            type="number"
                                            min={MIN_RESOLUTION}
                                            max={MAX_RESOLUTION}
                                            step={RESOLUTION_STEP}
                                            value={generationResolution.width}
                                            onChange={(e) => applyResolution(Number(e.target.value), generationResolution.height)}
                                            className="form-input w-full h-9 bg-white/5 border border-white/10 rounded-lg text-white/90 placeholder:text-white/30 focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500 px-3 text-sm font-mono [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                                        />
                                    </div>
                                    <div className="space-y-1">
                                        <label className="text-white/60 text-xs">高度</label>
                                        <input
                                            type="number"
                                            min={MIN_RESOLUTION}
                                            max={MAX_RESOLUTION}
                                            step={RESOLUTION_STEP}
                                            value={generationResolution.height}
                                            onChange={(e) => applyResolution(generationResolution.width, Number(e.target.value))}
                                            className="form-input w-full h-9 bg-white/5 border border-white/10 rounded-lg text-white/90 placeholder:text-white/30 focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500 px-3 text-sm font-mono [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Steps - Hide if not configured in custom model */}
                            {activeConfig.steps && (
                                <div className="group">
                                    <div className="flex items-center justify-between pb-2">
                                        <p className="text-white/80 text-sm font-medium">{t.steps}</p>
                                        <span className="text-white/50 text-xs bg-white/5 px-2 py-0.5 rounded font-mono">{Math.max(minSamplingSteps, steps)}</span>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <input
                                            type="range"
                                            min={effectiveMinSamplingSteps}
                                            max={effectiveMaxSamplingSteps}
                                            value={Math.min(effectiveMaxSamplingSteps, Math.max(effectiveMinSamplingSteps, steps))}
                                            onChange={(e) => {
                                                const nextValue = Number(e.target.value);
                                                setSteps(Math.min(effectiveMaxSamplingSteps, Math.max(effectiveMinSamplingSteps, nextValue)));
                                            }}
                                            className="custom-range text-purple-500"
                                        />
                                    </div>
                                    <div className="mt-1 flex items-center justify-between text-[11px] text-white/45">
                                        <span>快速 (4)</span>
                                        <span>高质量 (20)</span>
                                    </div>
                                </div>
                            )}

                            {/* Guidance Scale - Hide if not configured in custom model (or standard model doesn't support it) */}
                            {activeConfig.guidance && (
                                <div className="group">
                                    <div className="flex items-center justify-between pb-2">
                                        <p className="text-white/80 text-sm font-medium">{t.guidanceScale}</p>
                                        <span className="text-white/50 text-xs bg-white/5 px-2 py-0.5 rounded font-mono">{guidanceScale.toFixed(1)}</span>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <input
                                            type="range"
                                            min={activeConfig.guidance.min}
                                            max={activeConfig.guidance.max}
                                            step={activeConfig.guidance.step || 0.1}
                                            value={guidanceScale}
                                            onChange={(e) => setGuidanceScale(Number(e.target.value))}
                                            className="custom-range text-purple-500"
                                        />
                                    </div>
                                </div>
                            )}

                            {/* Seed */}
                            <div className="group">
                                <div className="flex items-center justify-between pb-2">
                                    <p className="text-white/80 text-sm font-medium">{t.seed}</p>
                                    <span className="text-white/40 text-xs">{t.seedOptional}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <div className="flex flex-1 items-center rounded-lg border border-white/10 bg-white/5 focus-within:ring-2 focus-within:ring-purple-500/50 focus-within:border-purple-500 transition-all h-10 overflow-hidden">
                                        <button
                                            onClick={() => handleAdjustSeed(-1)}
                                            className="h-full px-2 text-white/40 hover:text-white hover:bg-white/5 transition-colors border-r border-white/5"
                                        >
                                            <Minus className="w-3.5 h-3.5" />
                                        </button>
                                        <input
                                            type="number"
                                            value={seed}
                                            onChange={(e) => setSeed(e.target.value)}
                                            className="form-input flex-1 h-full bg-transparent border-none text-white/90 focus:ring-0 placeholder:text-white/30 px-2 text-xs font-mono text-center [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                                            placeholder={t.seedPlaceholder}
                                        />
                                        <button
                                            onClick={() => handleAdjustSeed(1)}
                                            className="h-full px-2 text-white/40 hover:text-white hover:bg-white/5 transition-colors border-l border-white/5"
                                        >
                                            <Plus className="w-3.5 h-3.5" />
                                        </button>
                                    </div>

                                    <Tooltip content={t.seedPlaceholder}>
                                        <button
                                            onClick={handleRandomizeSeed}
                                            className="flex h-10 w-10 shrink-0 cursor-pointer items-center justify-center overflow-hidden rounded-lg bg-white/10 text-white/60 hover:bg-white/20 hover:text-white transition-colors active:scale-95"
                                        >
                                            <Dices className="w-4 h-4" />
                                        </button>
                                    </Tooltip>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

