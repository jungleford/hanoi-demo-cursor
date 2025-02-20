import React, { useState, useEffect, useCallback } from 'react';
import styles from './index.module.less';

interface Disk {
    id: number;
    size: number;
}

type Rod = 'A' | 'B' | 'C';
type Mode = 'animation' | 'step';

interface Move {
    diskId: number;
    from: Rod;
    to: Rod;
}

interface HanoiTowerProps {
    diskCount: number;
    mode: Mode;
}

const HanoiTower: React.FC<HanoiTowerProps> = ({ diskCount, mode }) => {
    const [rods, setRods] = useState<{ [key in Rod]: Disk[] }>({
        A: [],
        B: [],
        C: []
    });
    const [moves, setMoves] = useState<Move[]>([]);
    const [currentStep, setCurrentStep] = useState<number>(0);
    const [isPlaying, setIsPlaying] = useState<boolean>(false);
    const [animationSpeed] = useState<number>(1000); // 1秒每步

    // 计算移动步骤
    const calculateMoves = useCallback((n: number, from: Rod, to: Rod, aux: Rod): Move[] => {
        const steps: Move[] = [];
        
        const hanoi = (n: number, from: Rod, to: Rod, aux: Rod) => {
            if (n === 0) return;
            
            // 先将 n-1 个盘子从源柱移动到辅助柱
            hanoi(n - 1, from, aux, to);
            
            // 移动第 n 个盘子从源柱到目标柱
            steps.push({ 
                diskId: n,  // 直接使用 n 作为盘子编号，n=1 是最小的盘子
                from, 
                to 
            });
            
            // 最后将 n-1 个盘子从辅助柱移动到目标柱
            hanoi(n - 1, aux, to, from);
        };

        hanoi(diskCount, from, to, aux);
        return steps;
    }, [diskCount]);

    // 初始化
    useEffect(() => {
        const initialDisks = Array.from({ length: diskCount }, (_, i) => ({
            id: i + 1,  // 从1开始编号，最小的盘子编号为1
            size: i + 1
        })).reverse();  // 反转数组，使最大的盘子在底部
        setRods({
            A: initialDisks,
            B: [],
            C: []
        });
        setMoves(calculateMoves(diskCount, 'A', 'C', 'B'));
        setCurrentStep(0);
        setIsPlaying(false);
    }, [diskCount, calculateMoves]);

    // 执行移动
    const executeMove = useCallback((move: Move) => {
        setRods(prev => {
            const newRods = { ...prev };
            // 检查移动是否合法
            const sourceRod = newRods[move.from];
            const targetRod = newRods[move.to];
            
            if (sourceRod.length === 0) return prev;  // 源柱为空，不能移动
            
            const movingDisk = sourceRod[sourceRod.length - 1];
            if (targetRod.length > 0 && targetRod[targetRod.length - 1].size < movingDisk.size) {
                return prev;  // 不能将大盘子放在小盘子上
            }
            
            const disk = newRods[move.from].pop();
            if (disk) {
                newRods[move.to].push(disk);
            }
            return newRods;
        });
    }, []);

    // 动画模式控制
    useEffect(() => {
        let timer: NodeJS.Timeout;
        if (mode === 'animation' && isPlaying && currentStep < moves.length) {
            timer = setTimeout(() => {
                executeMove(moves[currentStep]);
                setCurrentStep(prev => prev + 1);
            }, animationSpeed);
        }
        return () => clearTimeout(timer);
    }, [mode, isPlaying, currentStep, moves, executeMove, animationSpeed]);

    // 控制按钮处理函数
    const handleStart = () => setIsPlaying(true);
    const handlePause = () => setIsPlaying(false);
    const handleReset = () => {
        const initialDisks = Array.from({ length: diskCount }, (_, i) => ({
            id: i + 1,  // 从1开始编号，最小的盘子编号为1
            size: i + 1
        })).reverse();  // 反转数组，使最大的盘子在底部
        setRods({
            A: initialDisks,
            B: [],
            C: []
        });
        setCurrentStep(0);
        setIsPlaying(false);
    };

    const handleStepForward = () => {
        if (currentStep < moves.length) {
            executeMove(moves[currentStep]);
            setCurrentStep(prev => prev + 1);
        }
    };

    const handleStepBackward = () => {
        if (currentStep > 0) {
            const reverseMove = moves[currentStep - 1];
            const reversedMove = {
                diskId: reverseMove.diskId,
                from: reverseMove.to,
                to: reverseMove.from
            };
            executeMove(reversedMove);
            setCurrentStep(prev => prev - 1);
        }
    };

    return (
        <div className={styles['hanoi-tower']}>
            <div className={styles['control-panel']}>
                {mode === 'animation' ? (
                    <div className={styles['animation-controls']}>
                        <button 
                            onClick={handleStart} 
                            disabled={isPlaying || currentStep >= moves.length}
                        >
                            开始
                        </button>
                        <button 
                            onClick={handlePause} 
                            disabled={!isPlaying || currentStep >= moves.length}
                        >
                            暂停
                        </button>
                        <button onClick={handleReset}>重置</button>
                    </div>
                ) : (
                    <div className={styles['step-controls']}>
                        <button onClick={handleReset}>初始状态</button>
                        <button onClick={handleStepBackward} disabled={currentStep === 0}>上一步</button>
                        <button onClick={handleStepForward} disabled={currentStep === moves.length}>下一步</button>
                        <button 
                            onClick={() => {
                                handleReset();
                                for (let i = 0; i < moves.length; i++) {
                                    executeMove(moves[i]);
                                }
                                setCurrentStep(moves.length);
                            }}
                            disabled={currentStep === moves.length}
                        >
                            最后一步
                        </button>
                    </div>
                )}
            </div>

            <div className={styles.towers}>
                {(['A', 'B', 'C'] as Rod[]).map(rod => (
                    <div key={rod} className={styles.rod}>
                        <div className={styles['rod-name']}>{rod}</div>
                        <div className={styles['rod-pole']}></div>
                        <div className={styles['rod-base']}></div>
                        <div className={styles.disks}>
                            {rods[rod].map(disk => (
                                <div
                                    key={disk.id}
                                    className={styles.disk}
                                    style={{
                                        width: `${disk.size * 30 + 30}px`,
                                        backgroundColor: `hsl(${disk.id * 30}, 70%, 50%)`
                                    }}
                                >
                                    {disk.id}
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>

            <div className={styles['step-info']}>
                {currentStep > 0 && currentStep <= moves.length && (
                    <div>
                        步骤 {currentStep}/{moves.length}：
                        将盘子 {moves[currentStep - 1].diskId} 从
                        {moves[currentStep - 1].from} 移动到 
                        {moves[currentStep - 1].to}
                    </div>
                )}
            </div>
        </div>
    );
};

export default HanoiTower; 