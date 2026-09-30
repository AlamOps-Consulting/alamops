
"use client";

import React from "react";
import * as LucideIcons from "lucide-react";

type Props = {
	icon?: string | null;
	className?: string;
	size?: number | string;
};

type IconProps = {
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
	const StaticIcon = (LucideIcons as unknown as Record<string, unknown>)[name];
	if (typeof StaticIcon === "function") {
		const Component = StaticIcon as React.ComponentType<IconProps>;
		return <Component className={className} size={size} />;
	}

	return <span className={className}>{icon}</span>;
}
