// Async bootstrap to allow Module Federation shared scope initialization
// This is required for webpack hosts to properly load shared modules
import('./bootstrap');

export {};
