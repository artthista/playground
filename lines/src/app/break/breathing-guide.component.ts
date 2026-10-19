import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  computed,
  inject,
  input,
  output,
  signal,
} from '@angular/core';

export type BreathPhase = 'inhale' | 'hold' | 'exhale';

export interface BreathStep {
  phase: BreathPhase;
  title: string;
  subtitle: string;
  durationMs: number;
}

interface BreathLabel {
  title: string;
  subtitle: string;
}

export const DEFAULT_BREATH_STEPS: BreathStep[] = [
  { phase: 'inhale', title: 'Inspire', subtitle: 'devagar', durationMs: 4000 },
  { phase: 'hold', title: 'Segure', subtitle: 'por alguns segundos', durationMs: 3500 },
  { phase: 'exhale', title: 'Solte o ar', subtitle: 'devagar', durationMs: 6000 },
];

const LABEL_SWAP_MS = 180;

@Component({
  selector: 'app-breathing-guide',
  standalone: true,
  templateUrl: './breathing-guide.component.html',
  styleUrl: './breathing-guide.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BreathingGuideComponent {
  readonly steps = input<BreathStep[]>(DEFAULT_BREATH_STEPS);
  readonly completed = output<void>();

  private readonly destroyRef = inject(DestroyRef);
  private stepTimer?: ReturnType<typeof setTimeout>;
  private labelTimer?: ReturnType<typeof setTimeout>;

  readonly isRunning = signal(false);
  readonly index = signal(0);
  readonly labelHidden = signal(false);
  readonly completedCycles = signal(0);

  readonly phase = computed<BreathPhase | 'idle'>(() =>
    this.isRunning() ? this.steps()[this.index()]?.phase ?? 'idle' : 'idle',
  );

  readonly currentDuration = computed(() =>
    this.isRunning() ? this.steps()[this.index()]?.durationMs ?? 0 : 0,
  );

  readonly label = signal<BreathLabel>({
    title: 'Respire comigo',
    subtitle: '3 etapas para desacelerar',
  });

  readonly startLabel = computed(() =>
    this.completedCycles() > 0 ? 'Começar de novo' : 'Começar',
  );

  constructor() {
    this.destroyRef.onDestroy(() => this.clearTimers());
  }

  start(): void {
    if (!this.steps().length) return;

    this.isRunning.set(true);
    this.goTo(0);
  }

  back(): void {
    if (this.index() > 0) {
      this.goTo(this.index() - 1);
      return;
    }

    this.reset();
  }

  goTo(targetIndex: number): void {
    const step = this.steps()[targetIndex];
    if (!step) return;

    this.clearStepTimer();
    this.index.set(targetIndex);
    this.setLabel({ title: step.title, subtitle: step.subtitle });

    this.stepTimer = setTimeout(() => {
      if (targetIndex < this.steps().length - 1) {
        this.goTo(targetIndex + 1);
      } else {
        this.completedCycles.update((value) => value + 1);
        this.completed.emit();
        this.reset();
      }
    }, step.durationMs);
  }

  private setLabel(next: BreathLabel): void {
    clearTimeout(this.labelTimer);
    this.labelHidden.set(true);

    this.labelTimer = setTimeout(() => {
      this.label.set(next);
      this.labelHidden.set(false);
    }, LABEL_SWAP_MS);
  }

  private reset(): void {
    this.clearStepTimer();
    this.isRunning.set(false);
    this.index.set(0);
    this.setLabel({
      title: 'Respire comigo',
      subtitle: '3 etapas para desacelerar',
    });
  }

  private clearStepTimer(): void {
    clearTimeout(this.stepTimer);
    this.stepTimer = undefined;
  }

  private clearTimers(): void {
    this.clearStepTimer();
    clearTimeout(this.labelTimer);
    this.labelTimer = undefined;
  }
}
