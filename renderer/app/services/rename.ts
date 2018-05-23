import { FSService, Operation } from './fs';

/**
 * Rename
 */

export class RenameOperation extends Operation {

  /** Make a rename operation */
  static makeInstance(path: string,
                      name: string,
                      fsSvc: FSService): RenameOperation {
    const from = path;
    const base = fsSvc.path.dirname(path);
    const to = fsSvc.path.join(base, name);
    return (from !== to)? new RenameOperation(from, to) : null;
  }

  /** ctor */
  constructor(private from: string,
              private to: string,
                      original = true) {
    super(false);
    if (original)
      this.undo = new RenameOperation(to, from, false);
  }

  /** @override */
  runImpl(fsSvc: FSService): string {
    return fsSvc.rename(this.from, this.to);
  }

  /** @override */
  toStringImpl(fsSvc: FSService): string {
    const basename = fsSvc.path.basename;
    return `mv ${basename(this.from)} ${basename(this.to)}`;
  }

}