from email.mime import base
from jinja2 import FileSystemLoader, Environment
from flask import Flask, render_template
import os
import random
import json

from glob import glob

def get_rows(gtype):
    ret=[]
    # tgts = glob(f'data/target/*/*.wav')
    # random.shuffle(tgts)
    ours = 'vc/ours'
    yourtts = 'vc/yourtts'
    wav2vec_vc = 'vc/wav2vec-vc'
    vqmivc = 'vc/vqmivc'
    wavs = glob(f'vc/ours/{gtype}/*.wav')
    # print(tgts)
    for i, wav in enumerate(wavs):
        basename = os.path.basename(wav)
        src_basename = basename.split('-')[0]
        tgt_basename = basename.split('-')[1][:-4]
        # src = os.path.join("vc", f"source/{gtype}", f"{src_basename}.wav")
        tgt = os.path.join("vc", f"target/{gtype}", f"{tgt_basename}.wav")
        # print(tgt)
        wavs1 = glob(f'{ours}/{gtype}/{basename}')
        wavs2 = glob(f'{wav2vec_vc}/{gtype}/{basename}')
        wavs3 = glob(f'{yourtts}/{gtype}/{basename}')
        wavs4 = glob(f'{vqmivc}/{gtype}/{basename}')
        wavs = wavs1 + wavs2 + wavs3 + wavs4
        random.shuffle(wavs)
        for j in range(len(wavs)):
            ret.append((f'{i+1}', f'{j+1}', wavs[j]))
    return ret


def main():
    """Main function."""
    loader = FileSystemLoader(searchpath="./")
    env = Environment(loader=loader)
    template = env.get_template("base.html.jinja2")

    rows = get_rows("vctk")
    rows = json.dumps(rows)

    html = template.render(
        rows=rows,
    )

    print(rows)
    
    with open("mushra.html", "w", encoding="utf-8") as f:
        f.write(html)

if __name__ == "__main__":
    main()