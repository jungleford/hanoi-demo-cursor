import React, { useState } from 'react';
import HanoiTower from './components/HanoiTower';
import styles from './App.module.less';

const App: React.FC = () => {
    const [diskCount, setDiskCount] = useState<number>(3);
    const [mode, setMode] = useState<'animation' | 'step'>('animation');

    return (
        <div className={styles.app}>
            <h1>汉诺塔动画演示</h1>
            
            <div className={styles.controls}>
                <div className={styles['input-group']}>
                    <label htmlFor="diskCount">盘子数量：</label>
                    <input
                        id="diskCount"
                        type="number"
                        min={3}
                        max={8}
                        value={diskCount}
                        onChange={(e) => setDiskCount(Math.min(8, Math.max(3, parseInt(e.target.value) || 3)))}
                    />
                </div>
                
                <div className={styles['input-group']}>
                    <label htmlFor="mode">动画模式：</label>
                    <select
                        id="mode"
                        value={mode}
                        onChange={(e) => setMode(e.target.value as 'animation' | 'step')}
                    >
                        <option value="animation">连续动画</option>
                        <option value="step">单步执行</option>
                    </select>
                </div>
            </div>

            <HanoiTower diskCount={diskCount} mode={mode} />
        </div>
    );
};

export default App; 