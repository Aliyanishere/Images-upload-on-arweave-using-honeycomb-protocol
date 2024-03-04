
# Images uploading script on Arweave using Honeycomb Protocol.

This codespace contains a script for uploading the images on arweave using the Honeycomb Protocol functions.

## Steps to run this script.

- Clone this repository.
- Execute `yarn` to install all necessary dependencies.
- Create a directory named `images` at the root of the project and move all your images into this directory.
- Generate a `key.json` file at the root of the project and insert your wallet's secret key into it. This key will cover the costs in SOL for uploading images to Arweave (note that we are currently using the devnet environment for Arweave & honeycomb).
- Modify the directory path in the `config.ts` file according to your preferences. This configuration determines from which directory your JSON files are being read. After retrieving the local path of an image from a JSON file, it will upload the image to Arweave, return the Arweave URI, and then replace the local path with this URI. Images are uploaded in batches, with each batch containing up to 10 images.
- Following the upload process, the script will create a new directory named `resources` and populate it with the modified files. You have the option to alter the directory structure as needed.
- Within the utils folder, there is a script named `checkDuplicateSymbols` that identifies any duplicate symbols present within the metadata files.
## 🔗 Links
[![Honeycomb Protocol](https://img.shields.io/badge/Honeycomb_Protocol-000?style=for-the-badge)](https://docs.honeycombprotocol.com/)

[![Arweave](https://img.shields.io/badge/arweave-0A6?style=for-the-badge)](https://www.arweave.org/)
## Run Locally

Clone the project

```bash
  git clone https://github.com/Aliyanishere/Images-upload-on-arweave-using-honeycomb-protocol
```

Go to the project directory

```bash
  cd Images-upload-on-arweave-using-honeycomb-protocol
```

Install dependencies

```bash
  yarn
```

To start the server

```bash
  yarn start
```


## Tech Stack

**Server:** Node JS


## Feedback

If you have any feedback or suggestions, please reach out to me at hussainaliyan531@gamil.com or open a pull request.


## License

[MIT](https://choosealicense.com/licenses/mit/)

