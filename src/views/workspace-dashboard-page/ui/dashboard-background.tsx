import './dashboard-background.css';

import { cn } from '@shared/lib';

type ConfettiParticle = {
    id: string;
    top: string;
    right: string;
    size: number;
    shape: 'circle' | 'square' | 'ring' | 'pill';
    color: string;
    rotate: number;
    animation: 'float-1' | 'float-2' | 'float-3' | 'float-4';
    duration: number;
    delay: number;
};

const CONFETTI_PARTICLES: ConfettiParticle[] = [
    {
        id: 'c1',
        top: '48px',
        right: '120px',
        size: 10,
        shape: 'circle',
        color: 'bg-indigo-400/35',
        rotate: 0,
        animation: 'float-1',
        duration: 22,
        delay: 0,
    },
    {
        id: 'c2',
        top: '96px',
        right: '280px',
        size: 8,
        shape: 'square',
        color: 'bg-purple-400/30',
        rotate: 18,
        animation: 'float-2',
        duration: 26,
        delay: 1.2,
    },
    {
        id: 'c3',
        top: '72px',
        right: '48px',
        size: 14,
        shape: 'ring',
        color: 'border-indigo-400/40',
        rotate: 0,
        animation: 'float-3',
        duration: 30,
        delay: 2.4,
    },
    {
        id: 'c4',
        top: '160px',
        right: '200px',
        size: 6,
        shape: 'circle',
        color: 'bg-blue-300/35',
        rotate: 0,
        animation: 'float-4',
        duration: 20,
        delay: 0.8,
    },
    {
        id: 'c5',
        top: '128px',
        right: '360px',
        size: 12,
        shape: 'pill',
        color: 'bg-purple-300/30',
        rotate: -32,
        animation: 'float-1',
        duration: 28,
        delay: 3.1,
    },
    {
        id: 'c6',
        top: '220px',
        right: '88px',
        size: 9,
        shape: 'square',
        color: 'bg-indigo-300/35',
        rotate: 42,
        animation: 'float-2',
        duration: 24,
        delay: 1.8,
    },
    {
        id: 'c7',
        top: '188px',
        right: '320px',
        size: 16,
        shape: 'ring',
        color: 'border-purple-400/35',
        rotate: 0,
        animation: 'float-3',
        duration: 32,
        delay: 4.2,
    },
    {
        id: 'c8',
        top: '260px',
        right: '240px',
        size: 7,
        shape: 'circle',
        color: 'bg-blue-400/25',
        rotate: 0,
        animation: 'float-4',
        duration: 21,
        delay: 2.0,
    },
    {
        id: 'c9',
        top: '36px',
        right: '200px',
        size: 11,
        shape: 'square',
        color: 'bg-indigo-400/28',
        rotate: -24,
        animation: 'float-1',
        duration: 27,
        delay: 5.0,
    },
    {
        id: 'c10',
        top: '300px',
        right: '140px',
        size: 8,
        shape: 'pill',
        color: 'bg-purple-400/25',
        rotate: 55,
        animation: 'float-2',
        duration: 23,
        delay: 3.6,
    },
    {
        id: 'c11',
        top: '112px',
        right: '160px',
        size: 5,
        shape: 'circle',
        color: 'bg-blue-300/40',
        rotate: 0,
        animation: 'float-3',
        duration: 19,
        delay: 1.0,
    },
    {
        id: 'c12',
        top: '248px',
        right: '380px',
        size: 10,
        shape: 'square',
        color: 'bg-indigo-300/30',
        rotate: 12,
        animation: 'float-4',
        duration: 29,
        delay: 4.8,
    },
    {
        id: 'c13',
        top: '176px',
        right: '64px',
        size: 13,
        shape: 'ring',
        color: 'border-blue-400/30',
        rotate: 0,
        animation: 'float-1',
        duration: 25,
        delay: 2.6,
    },
    {
        id: 'c14',
        top: '340px',
        right: '300px',
        size: 6,
        shape: 'circle',
        color: 'bg-purple-300/35',
        rotate: 0,
        animation: 'float-2',
        duration: 22,
        delay: 0.4,
    },
    {
        id: 'c15',
        top: '84px',
        right: '420px',
        size: 9,
        shape: 'pill',
        color: 'bg-indigo-400/25',
        rotate: -18,
        animation: 'float-3',
        duration: 31,
        delay: 3.3,
    },
    {
        id: 'c16',
        top: '280px',
        right: '48px',
        size: 7,
        shape: 'square',
        color: 'bg-blue-400/28',
        rotate: 36,
        animation: 'float-4',
        duration: 26,
        delay: 5.5,
    },
    {
        id: 'c17',
        top: '144px',
        right: '440px',
        size: 12,
        shape: 'circle',
        color: 'bg-indigo-300/32',
        rotate: 0,
        animation: 'float-1',
        duration: 24,
        delay: 1.5,
    },
    {
        id: 'c18',
        top: '320px',
        right: '200px',
        size: 8,
        shape: 'ring',
        color: 'border-purple-300/40',
        rotate: 0,
        animation: 'float-2',
        duration: 28,
        delay: 4.0,
    },
    {
        id: 'c19',
        top: '204px',
        right: '400px',
        size: 5,
        shape: 'square',
        color: 'bg-blue-300/30',
        rotate: -40,
        animation: 'float-3',
        duration: 20,
        delay: 2.2,
    },
    {
        id: 'c20',
        top: '56px',
        right: '340px',
        size: 10,
        shape: 'pill',
        color: 'bg-purple-400/28',
        rotate: 28,
        animation: 'float-4',
        duration: 33,
        delay: 6.0,
    },
];

function ConfettiShape({ particle }: { particle: ConfettiParticle }) {
    const { size, shape, color, rotate } = particle;

    if (shape === 'ring') {
        return (
            <div
                className={cn('rounded-full border-2 bg-transparent', color)}
                style={{ width: size, height: size, transform: `rotate(${rotate}deg)` }}
            />
        );
    }

    if (shape === 'pill') {
        return (
            <div
                className={cn('rounded-full', color)}
                style={{ width: size * 2.2, height: size * 0.55, transform: `rotate(${rotate}deg)` }}
            />
        );
    }

    if (shape === 'square') {
        return (
            <div
                className={cn('rounded-[2px]', color)}
                style={{ width: size, height: size, transform: `rotate(${rotate}deg)` }}
            />
        );
    }

    return <div className={cn('rounded-full', color)} style={{ width: size, height: size }} />;
}

export function DashboardBackground() {
    return (
        <div className="pointer-events-none absolute inset-0 overflow-hidden contain-[paint]">
            <div className="absolute -top-24 -right-12 h-[700px] w-[800px] opacity-75">
                <div className="absolute top-[120px] right-[120px] h-[320px] w-[320px] rounded-full bg-indigo-200/40 blur-[100px]" />
                <div className="absolute top-[60px] right-[220px] h-[380px] w-[240px] -rotate-30 rounded-[60%_40%_50%_50%] bg-linear-to-br from-purple-300/35 to-indigo-200/15 blur-[70px]" />
                <div className="absolute top-[200px] right-[60px] h-[280px] w-[360px] -rotate-12 rounded-[50%_50%_40%_60%] bg-linear-to-tr from-blue-300/30 to-indigo-300/15 blur-[80px]" />
                <div
                    className="confetti-prism absolute top-[100px] right-[100px] h-[420px] w-[120px] rotate-35 rounded-full bg-linear-to-b from-white/0 via-indigo-200/25 to-purple-300/20 mix-blend-overlay blur-[2px]"
                    aria-hidden="true"
                />
                {CONFETTI_PARTICLES.map(particle => (
                    <div
                        key={particle.id}
                        className={cn('confetti-particle', `confetti-${particle.animation}`)}
                        style={{
                            top: particle.top,
                            right: particle.right,
                            animationDuration: `${particle.duration}s`,
                            animationDelay: `${particle.delay}s`,
                        }}
                    >
                        <ConfettiShape particle={particle} />
                    </div>
                ))}
            </div>
        </div>
    );
}
