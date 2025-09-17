
"use client";

import React from "react";
import dynamic from "next/dynamic";
import * as LucideIcons from "lucide-react";

type Props = {
	icon?: string | null;
	className?: string;
	size?: number | string;
};

/**
 * Detecta emoji simple (regex unicode) — si es emoji, renderiza <span>.
 * Si es un nombre de icono, intenta:
 *  1) buscar en LucideIcons importado (rápido, tree-shakable para los import propios)
 *  2) si no existe, importa dinámicamente el icon por nombre (ssr: false)
 */
export default function IconRenderer({ icon, className, size = 16 }: Props) {
	if (!icon) return null;

	// heurística emoji: si contiene caracteres emoji u 1-2 chars (ajusta según tus datos)
	const isEmoji = /\p{Emoji}/u.test(icon) || icon.length <= 2;

	if (isEmoji) {
		return (
			<span
				className={className}
				style={{ display: "inline-flex", alignItems: "center", fontSize: size }}
				aria-hidden
			>
				{icon}
			</span>
		);
	}

	// normaliza: aceptar "rocket", "Rocket", "arrow-right" etc -> PascalCase: Rocket, ArrowRight
	const toPascal = (s: string) =>
		s
			.replace(/[-_ ]+([a-zA-Z0-9])/g, (_, c) => c.toUpperCase())
			.replace(/^[a-z]/, (m) => m.toUpperCase());

	const name = toPascal(icon);

	// 1) intento de componente ya cargado en el bundle
	const StaticIcon = (LucideIcons as any)[name];
	if (StaticIcon) {
		const Comp = StaticIcon as React.ComponentType<any>;
		return <Comp className={className} size={size} />;
	}

	// 2) fallback dinámico (no-SSR) — intenta cargar el icon por nombre desde lucide-react
	//    dynamic(() => import(...).then(mod => mod[name]))
	//    Nota: el nombre debe existir en el paquete; si no existe dará error en runtime.
	const DynamicComp = dynamic(
		async () => {
			const mod = await import("lucide-react");
			const C = (mod as any)[name];
			if (!C) {
				// si no existe, devolvemos un fallback simple que muestra el nombre
				return () => <span className={className}>{icon}</span>;
			}
			return C;
		},
		{ ssr: false }
	);

	return <DynamicComp className={className} size={size} />;
}
