# Sentinel — FuSa Review Room

A focused prototype for semiconductor functional-safety review. The interface demonstrates an evidence-grounded AI workspace: safety-package findings, connected artefacts, and a private assistant that only answers from the linked package.

## Run locally

```bash
npm install
npm run dev
```

## Product boundary

The assistant proposes, traces and explains. It does not silently certify artefacts or calculate safety metrics. Production FMEDA/SPFM/LFM/PMHF calculations should be deterministic, versioned services with their inputs and outputs retained for review.
